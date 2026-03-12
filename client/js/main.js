
define(['jquery', 'app', 'project'], function($, App, project) {
    var app, game;

    var initApp = function() {
        $(document).ready(function() {
                app = new App();
            app.setProject(project);
            app.initProjectUI();
            app.center();
        
            if(Detect.isWindows()) {
                // Workaround for graphical glitches on text
                $('body').addClass('windows');
            }
            
            if(Detect.isOpera()) {
                // Fix for no pointer events
                $('body').addClass('opera');
            }
        
            $('body').click(function(event) {
                if($('#parchment').hasClass('credits')) {
                    app.toggleCredits();
                }
                
                if($('#parchment').hasClass('about')) {
                    app.toggleAbout();
                }
            });
        
                $('.barbutton').click(function() {
                    $(this).toggleClass('active');
                });
        
                $('#chatbutton').click(function() {
                    if($('#chatbutton').hasClass('active')) {
                        app.showChat();
                    } else {
                    app.hideChat();
                    }
                });
        
                $('#helpbutton').click(function() {
                app.toggleAbout();
                });
        
                $('#achievementsbutton').click(function() {
                app.toggleAchievements();
                if(app.blinkInterval) {
                    clearInterval(app.blinkInterval);
                }
                $(this).removeClass('blink');
                });

                $('#leaderboard-footer-label').click(function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if(app.game) {
                        app.toggleLeaderboard();
                    } else {
                        // On login page - show leaderboard overlay
                        $('#leaderboard').toggleClass('active');
                    }
                });
                
                $('#leaderboard .close').click(function() {
                    if(app.game) {
                        app.toggleLeaderboard();
                    } else {
                        $('#leaderboard').removeClass('active');
                    }
                });
                
                $('#leaderboard').click(function(e) {
                    if(e.target.id === 'leaderboard' || $(e.target).closest('.parchment-middle').length === 0) {
                        if(app.game) {
                            app.toggleLeaderboard();
                        } else {
                            $('#leaderboard').removeClass('active');
                        }
                    }
                });
                
                $('#close-leaderboard').click(function() {
                    if(app.game) {
                        app.toggleLeaderboard();
                    } else {
                        $('#leaderboard').removeClass('active');
                    }
                });
        
                $('#instructions').click(function() {
                app.hideWindows();
                });
                
                $('#playercount').click(function() {
                    app.togglePopulationInfo();
                });
                
                $('#population').click(function() {
                    app.togglePopulationInfo();
                });
        
                $('.clickable').click(function(event) {
                event.stopPropagation();
                });
        
                $('#toggle-credits').click(function() {
                    app.toggleCredits();
                });
        
                $('#create-new span').click(function() {
                    app.animateParchment('loadcharacter', 'confirmation');
                });
        
                $('.delete').click(function() {
                app.storage.clear();
                    app.animateParchment('confirmation', 'createcharacter');
                });
        
                $('#cancel span').click(function() {
                    app.animateParchment('confirmation', 'loadcharacter');
                });
                
                $('.ribbon').click(function() {
                    app.toggleAbout();
                });

            $('#nicknameinput').bind("keyup", function() {
                app.toggleButton();
            });
    
            $('#previous').click(function() {
                var $achievements = $('#achievements');
        
                if(app.currentPage === 1) {
                    return false;
                } else {
                    app.currentPage -= 1;
                    $achievements.removeClass().addClass('active page' + app.currentPage);
                }
            });
    
            $('#next').click(function() {
                var $achievements = $('#achievements'),
                    $lists = $('#lists'),
                    nbPages = $lists.children('ul').length;
        
                if(app.currentPage === nbPages) {
                    return false;
                } else {
                    app.currentPage += 1;
                    $achievements.removeClass().addClass('active page' + app.currentPage);
                }
            });

            $('#notifications div').bind(TRANSITIONEND, app.resetMessagesPosition.bind(app));
    
            $('.close').click(function() {
                app.hideWindows();
            });
        
            $('#xshare').click(function() {
                var score = app.storage.getMarketScore(),
                    text = encodeURIComponent('I just scored ' + score + ' points hunting memecoins in ' + app.project.projectName + ' 🚀');
                var url = 'https://x.com/intent/tweet?text=' + text + '&url=' + encodeURIComponent(app.project.website);
               app.openPopup('twitter', url);
               return false;
            });

            $('#tgshare').click(function() {
                var text = encodeURIComponent('Check out PumpQuest - hunt legendary tokens in the PumpVerse! 🚀');
                var url = 'https://t.me/share/url?url=https://pumpquest.com&text=' + text;
               app.openPopup('telegram', url);
               return false;
            });

            $('.twitter').click(function() {
                if($(this).attr('id') !== 'xshare') {
                    var url = $(this).attr('href');
                    app.openPopup('twitter', url);
                }
               return false;
            });

            $('.facebook').click(function() {
                if($(this).attr('id') !== 'tgshare') {
                    var url = $(this).attr('href');
                    app.openPopup('facebook', url);
                }
               return false;
            });
        
            var data = app.storage.data,
                shortWallet = function(address) {
                    if(!address || address.length < 10) {
                        return '';
                    }
                    return address.substr(0, 4) + '...' + address.substr(address.length - 4);
                },
                setWalletUiReady = function(isReady) {
                    if(isReady) {
                        $('#createcharacter').addClass('wallet-ready');
                    } else {
                        $('#createcharacter').removeClass('wallet-ready');
                    }
                },
                applyWalletContext = function(walletAddress) {
                    var savedNickname = $.trim(app.storage.getWalletNickname(walletAddress) || ''),
                        firstTimeWallet = savedNickname === '';

                    app.setWalletNeedsNickname(firstTimeWallet);

                    if(savedNickname) {
                        $('#nicknameinput').val(savedNickname);
                        $('#nicknameinput').attr('placeholder', 'Nickname loaded from your wallet');
                    } else {
                        $('#nicknameinput').val('');
                        $('#nicknameinput').attr('placeholder', 'Choose your nickname (required first time)');
                    }

                    setWalletUiReady(true);

                    var walletHasCharacter = !firstTimeWallet &&
                        data.hasAlreadyPlayed &&
                        data.player &&
                        data.player.name &&
                        data.player.walletAddress === walletAddress;

                    if(walletHasCharacter) {
                        $('#playername').html(data.player.name);
                        $('#playerimage').attr('src', data.player.image || '');
                        var currentState = $('#parchment').attr('class');
                        if(currentState !== 'loadcharacter' && currentState !== 'animate') {
                            app.animateParchment(currentState, 'loadcharacter');
                        }
                    }

                    app.toggleButton();
                },
                resolvePlayerName = function() {
                    var nickname = $.trim($('#nicknameinput').val() || ''),
                        walletAddress = app.getWalletAddress(),
                        fallbackName = shortWallet(walletAddress),
                        storageName = $.trim($('#playername').text() || '');

                    if(!walletAddress) {
                        alert('Please connect your wallet first.');
                        return '';
                    }

                    if(app.isWalletNicknameRequired() && nickname === '') {
                        alert('Please choose a nickname before your first play with this wallet.');
                        return '';
                    }

                    if(nickname) {
                        app.storage.setWalletNickname(walletAddress, nickname);
                        app.setWalletNeedsNickname(false);
                    }

                    return nickname || app.storage.getWalletNickname(walletAddress) || fallbackName || storageName;
                },
                toBase64 = function(bytes) {
                    var binary = '',
                        i;
                    for(i = 0; i < bytes.length; i += 1) {
                        binary += String.fromCharCode(bytes[i]);
                    }
                    return btoa(binary);
                },
                requestWalletAuthProof = function(walletAddress) {
                    var provider = window.solana,
                        nonce = Math.random().toString(36).slice(2) + String(new Date().getTime()),
                        authMessage = 'PumpQuest Login\nWallet: ' + walletAddress + '\nNonce: ' + nonce,
                        messageBytes = new TextEncoder().encode(authMessage);

                    if(!provider || !provider.signMessage) {
                        return Promise.reject(new Error('Wallet message signing is not available in this wallet provider.'));
                    }

                    return provider.signMessage(messageBytes, 'utf8').then(function(result) {
                        var signatureBytes = result.signature ? result.signature : result,
                            signatureBase64 = toBase64(signatureBytes);

                        app.setWalletAuthProof(authMessage, signatureBase64);
                        return true;
                    });
                },
                startWithWalletAuth = function(starting_callback) {
                    var walletAddress = app.getWalletAddress(),
                        name = resolvePlayerName();

                    if(!name || !walletAddress) {
                        return;
                    }

                    requestWalletAuthProof(walletAddress).then(function() {
                        app.tryStartingGame(name, starting_callback);
                    }).catch(function(err) {
                        log.error(err);
                        app.clearWalletAuthProof();
                        alert('Wallet signature is required to play. Please sign the message and try again.');
                    });
                },
                connectWallet = function() {
                    var provider = window.solana,
                        connectButton = $('#connect-wallet'),
                        connectLabel = $('#connect-wallet .connect-label');

                    if(connectButton.hasClass('connecting')) {
                        return;
                    }

                    if(!provider || !provider.isPhantom) {
                        alert('Phantom wallet is required. Please install Phantom and refresh.');
                        return;
                    }

                    connectButton.addClass('connecting');
                    connectLabel.text('CONNECTING...');

                    provider.connect().then(function(response) {
                        var walletAddress = response.publicKey.toString();
                        app.setWalletAddress(walletAddress);
                        app.clearWalletAuthProof();
                        connectLabel.text('WALLET CONNECTED');
                        $('#walletaddress').val(walletAddress);
                        applyWalletContext(walletAddress);
                        connectButton.removeClass('connecting');
                    }).catch(function(err) {
                        log.error(err);
                        alert('Wallet connection was canceled or failed.');
                        connectLabel.text('CONNECT WALLET');
                        connectButton.removeClass('connecting');
                    });
                };

                setWalletUiReady(false);
                app.clearWalletAuthProof();
                app.walletAddress = '';
                $('#walletaddress').val('');
                app.setWalletNeedsNickname(false);
                $('#nicknameinput').val('');
                $('#nicknameinput').attr('placeholder', 'Choose your nickname');

                if(data.player && data.player.walletAddress) {
                    $('#connect-wallet').attr('title', 'Connect your wallet to load your saved nickname');
                }

                $('#connect-wallet').click(function(event) {
                    event.preventDefault();
                    connectWallet();
                });

                $('.play div').click(function(event) {
                    startWithWalletAuth();
                });
        
            document.addEventListener("touchstart", function() {},false);
            
            $('#resize-check').bind("transitionend", app.resizeUi.bind(app));
            $('#resize-check').bind("webkitTransitionEnd", app.resizeUi.bind(app));
            $('#resize-check').bind("oTransitionEnd", app.resizeUi.bind(app));
        
            log.info("App initialized.");
        
            initGame();
        });
    };
    
    var initGame = function() {
        require(['game'], function(Game) {
            
            var canvas = document.getElementById("entities"),
                    background = document.getElementById("background"),
                    foreground = document.getElementById("foreground"),
                    input = document.getElementById("chatinput");

                game = new Game(app);
                game.setup('#bubbles', canvas, background, foreground, input);
                game.setStorage(app.storage);
                app.setGame(game);
                
                if(app.isDesktop && app.supportsWorkers) {
                    game.loadMap();
                }
        
                game.onGameStart(function() {
                app.initEquipmentIcons();
                });
                
                game.onDisconnect(function(message) {
                    $('#death').find('p').html(message+"<em>Please reload the page.</em>");
                    $('#respawn').hide();
                });
        
                game.onPlayerDeath(function() {
                    if($('body').hasClass('credits')) {
                        $('body').removeClass('credits');
                    }
                $('body').addClass('death');
                });
        
                game.onPlayerEquipmentChange(function() {
                    app.initEquipmentIcons();
                });
        
                game.onPlayerInvincible(function() {
                    $('#hitpoints').toggleClass('invincible');
                });

                game.onNbPlayersChange(function(worldPlayers, totalPlayers) {
                    var setWorldPlayersString = function(string) {
                                $("#instance-population").find("span:nth-child(2)").text(string);
                                $("#playercount").find("span:nth-child(2)").text(string);
                            },
                            setTotalPlayersString = function(string) {
                                $("#world-population").find("span:nth-child(2)").text(string);
                            };
                    
                    $("#playercount").find("span.count").text(worldPlayers);
                    
                    $("#instance-population").find("span").text(worldPlayers);
                    if(worldPlayers == 1) {
                        setWorldPlayersString("player");
                    } else {
                        setWorldPlayersString("players");
                    }
                    
                    $("#world-population").find("span").text(totalPlayers);
                    if(totalPlayers == 1) {
                        setTotalPlayersString("player");
                    } else {
                        setTotalPlayersString("players");
                    }
                });
        
                game.onAchievementUnlock(function(id, name, description) {
                    app.unlockAchievement(id, name);
                });
        
                game.onNotification(function(message) {
                    app.showMessage(message);
                });

                game.onMarketScoreChange(function(score) {
                    app.updateMarketScore(score);
                });

                game.onLeaderboardUpdate(function(players) {
                    app.updateServerLeaderboard(players);
                });
        
            app.initHealthBar();
        
            $('#nicknameinput').attr('value', '');
                $('#chatbox').attr('value', '');
                
                if(game.renderer.mobile || game.renderer.tablet) {
                $('#foreground').bind('touchstart', function(event) {
                    app.center();
                    app.setMouseCoordinates(event.originalEvent.touches[0]);
                        game.click();
                        app.hideWindows();
                });
            } else {
                $('#foreground').click(function(event) {
                    app.center();
                    app.setMouseCoordinates(event);
                    if(game) {
                            game.click();
                        }
                        app.hideWindows();
                    // $('#chatinput').focus();
                });
            }

            $('body').unbind('click');
            $('body').click(function(event) {
                var hasClosedParchment = false;
                
                if($('#parchment').hasClass('credits')) {
                    if(game.started) {
                        app.closeInGameCredits();
                        hasClosedParchment = true;
                    } else {
                        app.toggleCredits();
                    }
                }
                
                if($('#parchment').hasClass('about')) {
                    if(game.started) {
                        app.closeInGameAbout();
                        hasClosedParchment = true;
                    } else {
                        app.toggleAbout();
                    }
                }
                
                if(game.started && !game.renderer.mobile && game.player && !hasClosedParchment) {
                    game.click();
                }
            });
            
            $('#respawn').click(function(event) {
                game.audioManager.playSound("revive");
                game.restart();
                $('body').removeClass('death');
            });
            
            $(document).mousemove(function(event) {
                app.setMouseCoordinates(event);
                if(game.started) {
                    game.movecursor();
                }
            });

            $(document).keydown(function(e) {
                var key = e.which,
                    $chat = $('#chatinput');

                if(key === 13) {
                    if($('#chatbox').hasClass('active')) {
                        app.hideChat();
                    } else {
                        app.showChat();
                    }
                }
            });
            
            $('#chatinput').keydown(function(e) {
                var key = e.which,
                    $chat = $('#chatinput');

                if(key === 13) {
                    if($chat.attr('value') !== '') {
                        if(game.player) {
                            game.say($chat.attr('value'));
                        }
                        $chat.attr('value', '');
                        app.hideChat();
                        $('#foreground').focus();
                        return false;
                    } else {
                        app.hideChat();
                        return false;
                    }
                }
                
                if(key === 27) {
                    app.hideChat();
                    return false;
                }
            });

            $('#nicknameinput').keypress(function(event) {
                var $name = $('#nicknameinput');

                if(event.keyCode === 13) {
                    startWithWalletAuth(function() {
                        $name.blur(); // exit keyboard on mobile
                    });
                    return false; // prevent form submit
                }
            });
            
            $('#mutebutton').click(function() {
                game.audioManager.toggle();
            });
            
            $(document).bind("keydown", function(e) {
                var key = e.which,
                    $chat = $('#chatinput');

                if($('#chatinput:focus').size() == 0 && $('#nicknameinput:focus').size() == 0) {
                    if(key === 13) { // Enter
                        if(game.ready) {
                            $chat.focus();
                            return false;
                        }
                    }
                    if(key === 32) { // Space
                        // game.togglePathingGrid();
                        return false;
                    }
                    if(key === 70) { // F
                        // game.toggleDebugInfo();
                        return false;
                    }
                    if(key === 27) { // ESC
                        app.hideWindows();
                        _.each(game.player.attackers, function(attacker) {
                            attacker.stop();
                        });
                        return false;
                    }
                    if(key === 65) { // a
                        // game.player.hit();
                        return false;
                    }
                } else {
                    if(key === 13 && game.ready) {
                        $chat.focus();
                        return false;
                    }
                }
            });
            
            if(game.renderer.tablet) {
                $('body').addClass('tablet');
            }
        });
    };
    
    initApp();
});
