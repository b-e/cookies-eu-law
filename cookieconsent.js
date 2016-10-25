(function(window, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], function($) {
            return factory(window, $);
        });
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(window, require('jquery'));
    } else {
        window.cookiesEuLaw = factory(window, window.jQuery || window.Zepto);
    }
}(typeof window !== "undefined" ? window : this, function(window, jQuery) {
    'use strict';

    var cc =
    {
        version: '1.0.10',
        jqueryversionrequired: '1.4.4',
        initobj: false,
        ismobile: false,
        setupcomplete: false,
        allasked: false,
        checkedlocal: false,
        checkedremote: false,
        remoteresponse: false,
        frommodal: false,
        hassetupmobile: false,
        sessionkey: false,
        noclosewin: false,
        closingmodal: false,
        jqueryattempts: 0,
        reloadkey: false,
        forcereload: false,
        allagree: true,
        checkedipdb: false,
        cookies: {},
        uniqelemid: 0,
        executionblock: 0,
        defaultCookies: {social: {}, analytics: {}, advertising: {}},
        remoteCookies: {},
        approved: {},
        bindfunctions: {},
        checkeddonottrack: false,
        eumemberstates: [
            "BE",
            "BG",
            "CZ",
            "DK",
            "DE",
            "EE",
            "IE",
            "EL",
            "ES",
            "FR",
            "IT",
            "CY",
            "LV",
            "LT",
            "LU",
            "HU",
            "MT",
            "NL",
            "AT",
            "PL",
            "PT",
            "RO",
            "SI",
            "SK",
            "FI",
            "SE",
            "UK"
        ],
        settings: {
            refreshOnConsent: false,
            style: "dark",
            bannerPosition: "top",
            clickAnyLinkToConsent: false,
            privacyPolicy: false,
            collectStatistics: false,
            tagPosition: 'bottom-right',
            useSSL: false,
            serveraddr: '#',
            clearprefs: false,
            consenttype: 'explicit',
            onlyshowbanneronce: false,
            hideallsitesbutton: false,
            disableallsites: false,
            hideprivacysettingstab: false,
            scriptdelay: 400,
            testmode: false,
            overridewarnings: false,
            onlyshowwithineu: false,
            ipinfodbkey: false,
            ignoreDoNotTrack: false,
            bannerLang : "it"
        },

        strings: {
            jqueryWarning: "Developer: Caution! In order to use Cookie Consent, you need to use jQuery 1.4.4 or higher.",
            noJsBlocksWarning: "Developer: Warning! It doesn't look like you have set up Cookie Consent correctly.  You must follow all steps of the setup guide at http://silktide.com/cookieconsent/code.  If you believe you are seeing this message in error, you can use the overridewarnings setting (see docs for more information).",
            noKeyWarning: "Developer: Warning! You have set the plugin to only show within the EU, but you have not provided an API key for the IP Info DB.  Check the documentation at http://silktide.com/cookieconsent for more information",
            invalidKeyWarning: "Developer: Warning! You must provide a valid API key for IP Info DB.  Check the documentation at http://silktide.com/cookieconsent for more information",
            necessaryDefaultTitle: "Strictly necessary",
            socialDefaultTitle: "Social media",
            analyticsDefaultTitle: "Analytics",
            advertisingDefaultTitle: "Advertising",
            defaultTitle: "Default cookie title",
            necessaryDefaultDescription: "Some cookies on this website are strictly necessary and cannot be disabled.",
            socialDefaultDescription: "Permette a Facebook, Twitter e ad altri social di facilitare operazioni di login e condivisione del sito, dopo aver effettuato l’accesso al proprio account Facebook.",
            analyticsDefaultDescription: "Google Analytics è uno strumento di analisi di Google che aiuta i proprietari di siti web e app a capire come i visitatori interagiscono con i contenuti di loro proprietà.",
            advertisingDefaultDescription: "Per aiutarci a tenere traccia delle vendite e di altre conversioni, viene aggiunto un cookie al computer di un utente nel momento in cui quell’utente fa clic su un annuncio.",
            defaultDescription: "Default cookie description.",
            notificationTitle: "Questo sito utilizza cookie, anche di terze parti, per inviarti pubblicità e servizi in linea con le tue preferenze. Se vuoi saperne di più o negare il consenso a tutti o ad alcuni cookie clicca su “maggiori informazioni”. Chiudendo questo banner, scorrendo questa pagina o cliccando su 'Si, accetto' acconsenti all’uso dei cookie",
            notificationTitleImplicit: "We use cookies to ensure you get the best experience on our website",
            poweredBy: "Cookie Consent plugin for the EU cookie law",
            privacyPolicy: "Maggiori informazioni",
            learnMore: "Scopri di più",
            seeDetails: "Maggiori informazioni",
            seeDetailsImplicit: "change your settings",
            hideDetails: "nascondi",
            savePreference: 'Salva',
            saveForAllSites: 'Save for all sites',
            allowCookies: 'Si, accetto',
            allowCookiesImplicit: 'Chiudi',
            allowForAllSites: 'Allow for all sites',
            customCookie: 'This website uses a custom type of cookie which needs specific approval',
            privacySettings: "Privacy",
            privacySettingsDialogTitleA: "Impostazioni privacy",
            privacySettingsDialogTitleB: "per questo sito",
            privacySettingsDialogSubtitle: "Alcune funzionalità del sito hanno bisogno della tua autorizzazione per poter funzionare.",
            closeWindow: "Chiudi",
            changeForAllSitesLink: "Change settings for all websites",
            preferenceUseGlobal: 'Seleziona',
            preferenceConsent: "Autorizzo",
            preferenceDecline: "Non autorizzo",
            preferenceAsk: 'Chiedi ogni volta',
            preferenceAlways: "Consenti sempre",
            preferenceNever: "Nega sempre",
            notUsingCookies: "Questo sito non utilizza cookies.",
            clearedCookies: "Your cookies have been cleared, you will need to reload this page for the settings to have effect.",
            allSitesSettingsDialogTitleA: "Privacy settings",
            allSitesSettingsDialogTitleB: "for all websites",
            allSitesSettingsDialogSubtitle: "You may consent to these cookies for all websites that use this plugin.",
            backToSiteSettings: "Back to website settings"
        },
        stringsEN: {
            jqueryWarning: "Developer: Caution! In order to use Cookie Consent, you need to use jQuery 1.4.4 or higher.",
            noJsBlocksWarning: "Developer: Warning! It doesn't look like you have set up Cookie Consent correctly.  You must follow all steps of the setup guide at http://silktide.com/cookieconsent/code.  If you believe you are seeing this message in error, you can use the overridewarnings setting (see docs for more information).",
            noKeyWarning: "Developer: Warning! You have set the plugin to only show within the EU, but you have not provided an API key for the IP Info DB.  Check the documentation at http://silktide.com/cookieconsent for more information",
            invalidKeyWarning: "Developer: Warning! You must provide a valid API key for IP Info DB.  Check the documentation at http://silktide.com/cookieconsent for more information",
            necessaryDefaultTitle: "Strictly necessary",
            socialDefaultTitle: "Social media",
            analyticsDefaultTitle: "Analytics",
            advertisingDefaultTitle: "Advertising",
            defaultTitle: "Default cookie title",
            necessaryDefaultDescription: "Some cookies on this website are strictly necessary and cannot be disabled.",
            socialDefaultDescription: "Facebook, Twitter and other social websites need to know who you are to work properly.",
            analyticsDefaultDescription: "We anonymously measure your use of this website to improve your experience.",
            advertisingDefaultDescription: "Adverts will be chosen for you automatically based on your past behaviour and interests.",
            defaultDescription: "Default cookie description.",
            notificationTitle: "This website uses third party analytic cookies to analyse your surfing of the website, third party profiling cookies to track your surfing and to send you advertising messages in line with your preferences and third party social cookies to allow you to interact with social networks. To find out more or to deny your consent to all or to individual cookies click 'learn more'. ",
            notificationTitleImplicit: "We use cookies to ensure you get the best experience on our website",
            poweredBy: "Cookie Consent plugin for the EU cookie law",
            privacyPolicy: "learn more",
            learnMore: "Learn more",
            seeDetails: "see details",
            seeDetailsImplicit: "change your settings",
            hideDetails: "hide details",
            savePreference: 'Save preference',
            saveForAllSites: 'Save for all sites',
            allowCookies: 'Allow cookies',
            allowCookiesImplicit: 'Close',
            allowForAllSites: 'Allow for all sites',
            customCookie: 'This website uses a custom type of cookie which needs specific approval',
            privacySettings: "Privacy settings",
            privacySettingsDialogTitleA: "Privacy settings",
            privacySettingsDialogTitleB: "for this website",
            privacySettingsDialogSubtitle: "Some features of this website need your consent to remember who you are.",
            closeWindow: "Close window",
            changeForAllSitesLink: "Change settings for all websites",
            preferenceUseGlobal: 'Use global setting',
            preferenceConsent: "I consent",
            preferenceDecline: "I decline",
            preferenceAsk: 'Ask me each time',
            preferenceAlways: "Always allow",
            preferenceNever: "Never allow",
            notUsingCookies: "This website does not use any cookies.",
            clearedCookies: "Your cookies have been cleared, you will need to reload this page for the settings to have effect.",
            allSitesSettingsDialogTitleA: "Privacy settings",
            allSitesSettingsDialogTitleB: "for all websites",
            allSitesSettingsDialogSubtitle: "You may consent to these cookies for all websites that use this plugin.",
            backToSiteSettings: "Back to website settings"
        },

        onconsent: function (cookieType, input)
        {
            if (cc.isfunction(input))
            {
                fn = input;
            }
            else
            {
                scriptname = input;
                fn = function ()
                {
                    cc.insertscript(scriptname);
                };
            }
            if (cc.cookies && cc.cookies[cookieType] && cc.cookies[cookieType].approved)
            {
                cc.cookies[cookieType].executed = true;
                fn();
            }
            else
            {
                if (window.jQuery)
                {
                    jQuery(document).bind("cc_" + cookieType, fn);
                }
                else
                {
                    if (cc.bindfunctions[cookieType])
                    {
                        cc.bindfunctions[cookieType][cc.bindfunctions[cookieType].length] = fn;
                    }
                    else
                    {
                        cc.bindfunctions[cookieType] = new Array(fn);
                    }
                }
            }
        },

        geturlparameter: function (name)
        {
            name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regexS = "[\\?&]" + name + "=([^&#]*)";
            var regex = new RegExp(regexS);
            var results = regex.exec(window.location.search);
            if (results == null)
            {
                return false;
            }
            else
            {
                return decodeURIComponent(results[1].replace(/\+/g, " "));
            }
        },

        isfunction: function (functionToCheck)
        {
            var getType = {};
            return functionToCheck && getType.toString.call(functionToCheck) == '[object Function]';
        },

        setup: function ()
        {
            jQuery.each(cc.bindfunctions, function (key, value)
            {
                for (i = 0; i < value.length; i++)
                {
                    jQuery(document).bind("cc_" + key, value[i]);
                }
            });
            verstr = jQuery().jquery;
            parts = verstr.split('.');
            versionRequired = cc.jqueryversionrequired.split('.');
            jqueryOk = true;
            for (i = 0; i < parts.length && i < versionRequired.length; i++)
            {
                currentpart = parseInt(parts[i]);
                requiredpart = parseInt(versionRequired[i]);
                if (currentpart < requiredpart)
                {
                    /* Unsatisfied - this part of the version string is less than the version we require */
                    jqueryok = false;
                    break;
                }
                if (currentpart > requiredpart)
                {
                    /* Satisfied - this part of the version string is greater than the version we require */
                    break;
                }
                /* This version is the same as the one we require.  Check the next part of the version number. */
            }
            if (!jqueryOk)
            {
                alert(cc.getStringLocalizzata().jqueryWarning);
            }
            jQuery.each(cc.defaultCookies, function (key, value)
            {
                if (key == "necessary")
                {
                    cc.defaultCookies[key].title = cc.getStringLocalizzata().necessaryDefaultTitle;
                    cc.defaultCookies[key].description = cc.getStringLocalizzata().necessaryDefaultDescription;
                }
                else if (key == "social")
                {
                    cc.defaultCookies[key].title = cc.getStringLocalizzata().socialDefaultTitle;
                    cc.defaultCookies[key].description = cc.getStringLocalizzata().socialDefaultDescription;
                }
                else if (key == "analytics")
                {
                    cc.defaultCookies[key].title = cc.getStringLocalizzata().analyticsDefaultTitle;
                    cc.defaultCookies[key].description = cc.getStringLocalizzata().analyticsDefaultDescription;
                }
                else if (key == "advertising")
                {
                    cc.defaultCookies[key].title = cc.getStringLocalizzata().advertisingDefaultTitle;
                    cc.defaultCookies[key].description = cc.getStringLocalizzata().advertisingDefaultDescription;
                }
            });
            jQuery.each(cc.initobj.cookies, function (key, value)
            {
                if (!value.title)
                {
                    if (key == "necessary")
                    {
                        cc.initobj.cookies[key].title = cc.getStringLocalizzata().necessaryDefaultTitle;
                    }
                    else if (key == "social")
                    {
                        cc.initobj.cookies[key].title = cc.getStringLocalizzata().socialDefaultTitle;
                    }
                    else if (key == "analytics")
                    {
                        cc.initobj.cookies[key].title = cc.getStringLocalizzata().analyticsDefaultTitle;
                    }
                    else if (key == "advertising")
                    {
                        cc.initobj.cookies[key].title = cc.getStringLocalizzata().advertisingDefaultTitle;
                    }
                    else
                    {
                        cc.initobj.cookies[key].title = cc.getStringLocalizzata().defaultTitle;
                    }
                }
                if (!value.description)
                {
                    if (key == "necessary")
                    {
                        cc.initobj.cookies[key].description = cc.getStringLocalizzata().necessaryDefaultDescription;
                    }
                    else if (key == "social")
                    {
                        cc.initobj.cookies[key].description = cc.getStringLocalizzata().socialDefaultDescription;
                    }
                    else if (key == "analytics")
                    {
                        cc.initobj.cookies[key].description = cc.getStringLocalizzata().analyticsDefaultDescription;
                    }
                    else if (key == "advertising")
                    {
                        cc.initobj.cookies[key].description = cc.getStringLocalizzata().advertisingDefaultDescription;
                    }
                    else
                    {
                        cc.initobj.cookies[key].description = cc.getStringLocalizzata().defaultDescription;
                    }
                }

                if (!value.defaultstate)
                {
                    cc.initobj.cookies[key].defaultstate = "on";
                }

                cc.initobj.cookies[key].asked = false;
                cc.initobj.cookies[key].approved = false;
                cc.initobj.cookies[key].executed = false;
            });
            if (cc.settings.onlyshowwithineu && !cc.settings.ipinfodbkey)
            {
                alert(cc.getStringLocalizzata().noKeyWarning);
            }
            testmode = cc.geturlparameter('cctestmode');
            if (testmode == 'accept' || testmode == 'decline')
            {
                cc.settings.testmode = testmode;
            }
            if (cc.settings.disableallsites)
            {
                cc.settings.hideallsitesbutton = true;
            }

            for (var attrname in cc.initobj.cookies)
            {
                cc.cookies[attrname] = cc.initobj.cookies[attrname];
                if (cc.settings.testmode == "accept")
                {
                    cc.approved[attrname] = "yes";
                }
                if (cc.settings.testmode == "decline")
                {
                    cc.approved[attrname] = "no";
                }
            }

        },

        getStringLocalizzata : function()
        {
            if(cc.settings.bannerLang == "it")
            {
                return cc.strings;
            }
            else if(cc.settings.bannerLang == "en")
            {
                return cc.stringsEN;
            }
        },

        initialise: function (obj)
        {
            jQuery(".openSettings").click(function(e)
            {
                e.preventDefault();
                cc.showmodal();
            });

            jQuery(window).scroll(function()
            {
                if(jQuery(window).scrollTop() > 100 && cc.allasked == false)
                {
                    jQuery("#cc-approve-button-thissite").click();
                }
            });

            cc.initobj = obj;

            //carica settings
            if (obj.settings !== undefined)
            {
                for (var attrname in obj.settings)
                {
                    this.settings[attrname] = obj.settings[attrname];
                }
            }

            //carica le stringhe
            if (obj.strings !== undefined)
            {
                for (var attrname in obj.strings)
                {
                    this.strings[attrname] = obj.strings[attrname];
                }
            }

            cc.settings.style = "cc-" + cc.settings.style;
            cc.settings.bannerPosition = "cc-" + cc.settings.bannerPosition;
            if (cc.settings.useSSL)
            {
                //cc.settings.serveraddr = 'https://cookieconsent.silktide.com/';
            }

            if (window.jQuery)
            {
                cc.setupcomplete = true;
                cc.setup();
            }
        },

        calculatestatsparams: function ()
        {
            params = "c=";
            first = true;
            jQuery.each(cc.initobj.cookies, function (key, value)
            {
                if (first)
                {
                    first = false;
                }
                else
                {
                    params += ";";
                }
                params += encodeURIComponent(key) + ":";

                if (cc.approved[key])
                {
                    params += cc.approved[key];
                }
                else
                {
                    params += "none";
                }
                if (value.statsid)
                {
                    params += ":" + value.statsid;
                }
            });
            if (cc.ismobile)
            {
                params += "&m=1";
            }
            else
            {
                params += "&m=0";
            }
            params += "&u=" + encodeURIComponent(document.URL);
            return params;
        },

        setsessionkey: function (data)
        {
            cc.sessionkey = data;
        },


        fetchprefs: function ()
        {
            cc.remoteresponse = false;
            params = "?s=1";
            if (cc.settings.collectStatistics)
            {
                params = "?s=1&" + cc.calculatestatsparams();
            }
            if (cc.settings.clearprefs)
            {
                params += "&v=1";
                cc.settings.clearprefs = false;
            }
            cc.insertscript(cc.settings.serveraddr + params);
            setTimeout(function ()
            {
                if (!cc.remoteresponse)
                {
                    cc.checkapproval();
                }
            }, 3000);
            this.checkedremote = true;
        },

        responseids: function (data)
        {
            jQuery.each(data, function (key, value)
            {
                cc.cookies[key].statsid = value;
            });
        },

        insertscript: function (script)
        {
            var newfile = document.createElement('script');
            newfile.setAttribute("type", "text/javascript");
            newfile.setAttribute("src", script);
            document.getElementsByTagName("head")[0].appendChild(newfile);
        },

        insertscripttag: function (content)
        {
            var newfile = document.createElement('script');
            newfile.setAttribute("type", "text/javascript");
            newfile.innerHTML = content;
            document.getElementsByTagName("head")[0].appendChild(newfile);
        },

        checklocal: function ()
        {
            this.checkedlocal = true;
            jQuery.each(cc.cookies, function (key, value)
            {
                cookieval = cc.getcookie('cc_' + key);
                if (cookieval)
                {
                    cc.approved[key] = cookieval;
                }
            });
            this.checkapproval();
        },

        response: function (data)
        {
            cc.remoteresponse = true
            jQuery.each(data, function (key, value)
            {
                if (cc.cookies[key] && (!cc.approved[key] || (cc.approved[key] && (cc.approved[key] == "always" || cc.approved[key] == "never"))))
                {
                    cc.setcookie('cc_' + key, value, 365);
                }
            });

            for (var attrname in data)
            {
                cc.remoteCookies[attrname] = data[attrname];
                if (this.approved[attrname] != "yes" && this.approved[attrname] != "no")
                {
                    this.approved[attrname] = data[attrname];
                }
            }
            jQuery.each(cc.cookies, function (key, value)
            {
                if (!data[key] && (cc.approved[key] == "always" || cc.approved[key] == "never"))
                {
                    cc.cookies[key].approved = false;
                    cc.deletecookie(key);
                    delete cc.approved[key];
                }
            });

            this.checkapproval();
        },

        deletecookie: function (key)
        {
            date = new Date();
            date.setDate(date.getDate() - 1);
            document.cookie = escape("cc_" + key) + '=; path=/; expires=' + date;
        },

        reloadifnecessary: function ()
        {
            if (cc.settings.refreshOnConsent || cc.ismobile || cc.forcereload)
            {
                setTimeout("location.reload(true);", 50);
            }
        },

        onkeyup: function (e)
        {
            if (e.keyCode == 27)
            {
                cc.closemodals();
            }
        },

        closemodals: function ()
        {
            if (!cc.closingmodal)
            {
                if (cc.noclosewin)
                {
                    cc.noclosewin = false;
                }
                else
                {
                    if (jQuery('#cc-modal').is(":visible"))
                    {
                        jQuery('#cc-modal .cc-modal-closebutton a').click();
                    }

                    if (jQuery('#cc-settingsmodal').is(":visible"))
                    {
                        jQuery('#cc-settingsmodal #cc-settingsmodal-closebutton a').click();
                    }


                }
            }
        },

        showbanner: function ()
        {
            if (window.location.href.indexOf(cc.settings.privacyPolicyUrl) >= 0)
            {
                //console.log("non mostrare");
                return;
            }

            jQuery('#cc-tag').fadeOut(null, function ()
            {
                jQuery(this).remove();
            });

            jQuery('#cc-notification').remove();
            if (cc.ismobile)
            {
                cc.setupformobile();
                //jQuery('head').append('<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;">');
                //jQuery('body').html('').css("margin", 0);
            }

            data = '<div id="cc-notification">' +
            '<div id="cc-notification-wrapper">' +
            '<h4><span>' + cc.getStringLocalizzata().notificationTitle + '</span></h4>' +
            '<div id="cc-notification-permissions">' +
            '<a id="cc-notification-logo" class="cc-logo" target="_blank" href="http://silktide.com/cookieconsent" title="' + cc.getStringLocalizzata().poweredBy + '"><span>' + cc.getStringLocalizzata().poweredBy + '</span></a> ' +
            '</div>' +
            '<ul class="cc-notification-buttons">' +

            '<li>' +
            '<a class="cc-link" href="" id="cc-approve-button-allsites">' + cc.getStringLocalizzata().allowForAllSites + '</a>' +
            '</li>' +
            '<li>' +
            '<a class="cc-link" href="#" id="cc-approve-button-thissite">' + cc.getStringLocalizzata().allowCookies + '</a>' +
            '</li>' +
            '</ul>' +
            '<a href="#" id="cc-close">x</a>' +
            '<div class="cc-clear"></div>' +
            '</div>' +
            '</div>';

            jQuery('body').prepend(data);
            if (cc.settings.hideallsitesbutton)
            {
                jQuery('#cc-approve-button-allsites').hide();
            }
            if (cc.settings.consenttype == 'implicit')
            {
                jQuery('#cc-notification h4 span').html(cc.getStringLocalizzata().notificationTitleImplicit);
                jQuery('#cc-approve-button-thissite').html(cc.getStringLocalizzata().allowCookiesImplicit);
                jQuery('#cc-approve-button-thissite').parent().after(jQuery('#cc-approve-button-allsites').parent());
                jQuery('#cc-approve-button-allsites').hide();
            }
            jQuery('#cc-notification-logo').hide();


            jQuery('#cc-notification').addClass(cc.settings.style).addClass(cc.settings.bannerPosition);
            bannerh = jQuery('#cc-notification').height();
            jQuery('#cc-notification').hide();
            if (cc.ismobile)
            {
                jQuery('#cc-notification').addClass("cc-mobile");
            }

            jQuery('#cc-notification-permissions').prepend('<ul></ul>');
            allcustom = true;

            jQuery.each(cc.cookies, function (key, value)
            {
                if (!value.asked)
                {
                    jQuery('#cc-notification-permissions ul').append('<li><input type="checkbox" checked="checked" id="cc-checkbox-' + key + '" /> <label id="cc-label-' + key + '" for="cc-checkbox-' + key + '"><strong>' + value.title + '</strong> ' + value.description + '</label></li>');
                    if (value.link)
                    {
                        jQuery('#cc-label-' + key).append(' <a target="_blank" href="' + value.link + '" class="cc-learnmore-link">' + cc.getStringLocalizzata().learnMore + '</a>');
                    }
                    if (key == "social" || key == "analytics" || key == "advertising")
                    {
                        allcustom = false;
                    }
                    jQuery('#cc-checkbox-' + key).change(function ()
                    {
                        if (jQuery(this).is(':checked'))
                        {
                            jQuery(this).parent().removeClass('cc-notification-permissions-inactive');
                        }
                        else
                        {
                            jQuery(this).parent().addClass('cc-notification-permissions-inactive');

                        }
                    });
                    if (value.defaultstate == "off")
                    {
                        jQuery('#cc-checkbox-' + key).removeAttr("checked").parent().addClass('cc-notification-permissions-inactive');
                    }
                    if (key == "necessary")
                    {
                        jQuery('#cc-checkbox-' + key).attr("disabled", "disabled");
                    }
                }
            });

            jQuery('#cc-notification-wrapper h4').append(' - <a class="cc-link" href="#" id="cc-notification-moreinfo">' + cc.getStringLocalizzata().seeDetails + '</a>');
            if (cc.settings.consenttype == "implicit")
            {
                jQuery('#cc-notification-moreinfo').html(cc.getStringLocalizzata().seeDetailsImplicit);
            }

            jQuery('#cc-notification-moreinfo').click(function ()
            {
                if (jQuery(this).html() == cc.getStringLocalizzata().seeDetails || jQuery(this).html() == cc.getStringLocalizzata().seeDetailsImplicit)
                {
                    if (cc.settings.consenttype == 'implicit')
                    {
                        if (!cc.settings.hideallsitesbutton)
                        {
                            jQuery('#cc-approve-button-allsites').show();
                        }
                    }
                    jQuery('#cc-approve-button-thissite').html(cc.getStringLocalizzata().savePreference);
                    jQuery('#cc-approve-button-allsites').html(cc.getStringLocalizzata().saveForAllSites);
                    jQuery(this).html(cc.getStringLocalizzata().hideDetails);
                }
                else
                {
                    jQuery.each(cc.cookies, function (key, value)
                    {
                        if (value.defaultstate == "off")
                        {
                            jQuery('#cc-checkbox-' + key).removeAttr("checked");
                            jQuery(this).parent().addClass('cc-notification-permissions-inactive');
                        }
                        else
                        {
                            jQuery('#cc-checkbox-' + key).attr('checked', 'checked');
                            jQuery(this).parent().removeClass('cc-notification-permissions-inactive');

                        }
                    });
                    if (cc.settings.consenttype == 'implicit')
                    {
                        jQuery(this).html(cc.getStringLocalizzata().seeDetailsImplicit);
                        jQuery('#cc-approve-button-thissite').html(cc.getStringLocalizzata().allowCookiesImplicit);
                        jQuery('#cc-approve-button-allsites').hide();
                    }
                    else
                    {
                        jQuery(this).html(cc.getStringLocalizzata().seeDetails);
                        jQuery('#cc-approve-button-thissite').html(cc.getStringLocalizzata().allowCookies);
                        jQuery('#cc-approve-button-allsites').html(cc.getStringLocalizzata().allowForAllSites);
                    }
                }
                jQuery('#cc-notification-logo').fadeToggle();
                jQuery('#cc-notification-permissions').slideToggle();
                jQuery(this).blur();
                return false;
            });

            if (!cc.ismobile)
            {
                if (cc.settings.bannerPosition == "cc-push")
                {
                    jQuery('html').animate({marginTop: bannerh}, 400);
                }
                jQuery('#cc-notification').slideDown();
            }
            else
            {
                jQuery('#cc-notification').show();
            }

            jQuery('#cc-approve-button-thissite').click(cc.onlocalconsentgiven);
            if (cc.settings.clickAnyLinkToConsent)
            {
                jQuery("a").filter(':not(.cc-link)').click(cc.onlocalconsentgiven);
            }
            if (allcustom)
            {
                jQuery('#cc-notification h4 span').html(cc.getStringLocalizzata().customCookie);
                jQuery('#cc-approve-button-allsites').hide();
            }
            else
            {
                jQuery('#cc-approve-button-allsites').click(cc.onremoteconsentgiven);
            }

            if (cc.settings.privacyPolicy)
            {
                jQuery('<a id="link-policy" target="blank" href="' + cc.settings.privacyPolicyUrl + '">' + cc.getStringLocalizzata().privacyPolicy + '</a> | ').insertAfter("#cc-notification-moreinfo");
            }

            jQuery('#cc-close').click(function ()
            {
                jQuery("#cc-approve-button-thissite").click();
            });

        },

        timestamp: function ()
        {
            return Math.round((new Date()).getTime() / 1000);
        },

        locationcallback: function (data)
        {
            if (data.statusCode == "OK" && data.countryCode)
            {
                ineu = "yes";
                if (jQuery.inArray(data.countryCode, cc.eumemberstates) == -1)
                {
                    //Visitor is from outside EU
                    ineu = "no";
                    jQuery.each(cc.cookies, function (key, value)
                    {
                        cc.approved[key] = "yes";
                    });
                    cc.settings.hideprivacysettingstab = true;
                }
                cc.setcookie('cc_ineu', ineu, 365);
            }
            if (data.statusCode == "ERROR" && data.statusMessage == "Invalid API key.")
            {
                alert(cc.getStringLocalizzata().invalidKeyWarning)
            }
            cc.checkapproval();
        },

        checkdonottrack: function ()
        {
            cc.checkeddonottrack = true;
            if (!cc.settings.ignoreDoNotTrack)
            {
                if (navigator.doNotTrack == "yes" || navigator.doNotTrack == "1" || navigator.msDoNotTrack == "yes" || navigator.msDoNotTrack == "1")
                {
                    cc.settings.consenttype = "explicit";
                }
            }
            cc.checkapproval();
        },

        checkapproval: function ()
        {
            if (!cc.checkedipdb && cc.settings.onlyshowwithineu)
            {
                cc.checkedipdb = true;
                ineu = cc.getcookie('cc_ineu');
                if (ineu)
                {
                    if (ineu == "no")
                    {
                        jQuery.each(cc.cookies, function (key, value)
                        {
                            cc.approved[key] = "yes";
                        });
                        cc.settings.hideprivacysettingstab = true;
                    }
                }
                else
                {
                    jQuery.getScript("http://api.ipinfodb.com/v3/ip-country/?key=" + cc.settings.ipinfodbkey + "&format=json&callback=cc.locationcallback");
                    return;
                }
            }

            cc.allasked = true;
            jQuery.each(cc.cookies, function (key, value)
            {
                if (cc.approved[key])
                {
                    if (cc.approved[key] == "yes" || (cc.approved[key] == "always" && cc.checkedremote))
                    {
                        cc.cookies[key].asked = true;
                        cc.cookies[key].approved = true;
                        cc.execute(key);
                    }
                    else if ((cc.approved[key] == "never" && cc.checkedremote) || cc.approved[key] == "no")
                    {
                        cc.cookies[key].asked = true;
                        cc.cookies[key].approved = false;
                    }
                    else
                    {

                        cc.allasked = false;
                    }
                }
                else
                {

                    cc.allasked = false;
                }
            });


            if (!cc.allasked)
            {
                if (!cc.checkedlocal)
                {
                    cc.checklocal();
                    return;
                }
                if (!cc.checkedremote && !cc.settings.disableallsites)
                {
                    cc.fetchprefs();
                    return;
                }
                if (!cc.checkeddonottrack)
                {
                    cc.checkdonottrack();
                    return;
                }
                if (cc.settings.consenttype == "implicit")
                {
                    jQuery.each(cc.cookies, function (key, value)
                    {
                        if (!cc.cookies[key].asked)
                        {
                            if (cc.settings.onlyshowbanneronce)
                            {
                                cc.setcookie('cc_' + key, 'yes', 365);
                            }
                            cc.execute(key);
                        }
                    });
                }
                cc.showbanner();
            }
            else
            {
                if (cc.settings.collectStatistics)
                {
                    params = "";
                    params += "?s=1&n=1&" + cc.calculatestatsparams();
                    cc.insertscript(cc.settings.serveraddr + params);
                }
                cc.showminiconsent();
            }
        },

        execute: function (cookieType)
        {
            if (cookieType == "necessary")
            {
                return;
            }
            if (cc.cookies[cookieType].executed)
            {
                return;
            }
            jQuery('.cc-placeholder-' + cookieType).remove();
            jQuery('script.cc-onconsent-' + cookieType + '[type="text/plain"]').each(function ()
            {
                if (jQuery(this).attr('src'))
                {
                    jQuery(this).after('<script type="text/javascript" src="' + jQuery(this).attr('src') + '"></script>');
                }
                else
                {
                    jQuery(this).after('<script type="text/javascript">' + jQuery(this).html() + '</script>');
                }
            });
            cc.cookies[cookieType].executed = true;
            jQuery(document).trigger("cc_" + cookieType);

            cc.executescriptinclusion(cookieType);

        },

        executescriptinclusion: function (cookieType)
        {
            timetaken = jQuery('script.cc-onconsent-inline-' + cookieType + '[type="text/plain"]').size() * cc.settings.scriptdelay;
            now = new Date().getTime();

            if (now < cc.executionblock)
            {
                setTimeout(cc.executescriptinclusion, cc.executionblock - now, [cookieType]);
                return;
            }
            cc.executionblock = now + timetaken;

            cc.insertscripts(cookieType);
        },

        insertscripts: function (cookieType)
        {

            jQuery('script.cc-onconsent-inline-' + cookieType + '[type="text/plain"]').first().each(function ()
            {
                cc.uniqelemid++;
                if (jQuery(this).parents('body').size() > 0)
                {
                    jQuery(this).after('<div id="cc-consentarea-' + cc.uniqelemid + '" class="' + cookieType + '"></div>');
                    document.write = function (g)
                    {
                        jQuery('#cc-consentarea-' + cc.uniqelemid).append(g);
                    };
                    document.writeln = function (g)
                    {
                        jQuery('#cc-consentarea-' + cc.uniqelemid).append(g);
                    };
                }

                if (jQuery(this).attr('src'))
                {
                    jQuery(this).after('<script type="text/javascript" src="' + jQuery(this).attr('src') + '"></script>');
                }
                else
                {
                    jQuery(this).after('<script type="text/javascript">' + jQuery(this).html() + '</script>');
                }
                jQuery(this).remove();

            });

            if (jQuery('script.cc-onconsent-inline-' + cookieType + '[type="text/plain"]').size() > 0)
            {
                setTimeout(cc.insertscripts, cc.settings.scriptdelay, [cookieType]);
            }
        },

        getcookie: function (c_name)
        {
            var i, x, y, ARRcookies = document.cookie.split(";");
            for (i = 0; i < ARRcookies.length; i++)
            {
                x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
                y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
                x = x.replace(/^\s+|\s+jQuery/g, "");
                if (x == c_name)
                {
                    return unescape(y);
                }
            }
            return false;
        },

        setcookie: function (name, value, expirydays)
        {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + expirydays);
            document.cookie = name + '=' + value + '; expires=' + exdate.toUTCString() + '; path=/'
        },

        onremoteconsentgiven: function ()
        {
            if (cc.settings.clickAnyLinkToConsent)
            {
                jQuery("a").filter(':not(.cc-link)').unbind("click");
            }
            cc.allagree = true;
            jQuery.each(cc.cookies, function (key, value)
            {
                if (!value.approved && !value.asked)
                {
                    if (jQuery('#cc-checkbox-' + key).is(':checked'))
                    {
                        if (key == "social" || key == "analytics" || key == "advertising")
                        {
                            cc.remoteCookies[key] = "always";
                            cc.approved[key] = "always";
                        }
                        else
                        {
                            cc.approved[key] = "yes";
                        }
                        cc.cookies[key].asked = true;
                    }
                    else
                    {
                        if (key == "social" || key == "analytics" || key == "advertising")
                        {
                            cc.remoteCookies[key] = "never";
                            cc.approved[key] = "never";
                        }
                        else
                        {
                            cc.approved[key] = "no";
                        }
                        cc.allagree = false;
                        cc.cookies[key].asked = true;
                    }
                    cc.setcookie('cc_' + key, cc.approved[key], 365);
                }
                else
                {
                }
            });
            urlx = cc.settings.serveraddr + '?p=1&tokenonly=true&cc-key=' + cc.sessionkey;
            if (cc.remoteCookies['social'])
            {
                urlx += '&cc-cookies-social=' + cc.approved['social'];
            }
            if (cc.remoteCookies['analytics'])
            {
                urlx += '&cc-cookies-analytics=' + cc.approved['analytics'];
            }
            if (cc.remoteCookies['advertising'])
            {
                urlx += '&cc-cookies-advertising=' + cc.approved['advertising'];
            }
            cc.reloadkey = true;
            cc.insertscript(urlx);

            if (!cc.ismobile)
            {
                jQuery('#cc-notification').slideUp();
                if (cc.settings.bannerPosition == "cc-push")
                {
                    //detect body margin
                    jQuery('html').animate({marginTop: 0}, 400);
                }
            }
            cc.checkapproval();

            return false;
        },

        onlocalconsentgiven: function ()
        {
            enableall = false;
            enablejustone = false;
            if (jQuery(this).hasClass('cc-button-enableall') || jQuery(this).hasClass('cc-button-enable-all'))
            {
                enableall = true;
                jQuery.each(cc.cookies, function (key, value)
                {
                    cc.cookies[key].asked = false;
                });
            }
            elem = this;
            jQuery.each(cc.cookies, function (key, value)
            {
                if (jQuery(elem).hasClass('cc-button-enable-' + key))
                {
                    enablejustone = true;
                    cc.approved[key] = "yes";
                    cc.cookies[key].asked = true;
                    cc.setcookie('cc_' + key, cc.approved[key], 365);
                }
            });

            cc.allagree = true;
            if (!enablejustone)
            {
                if (cc.settings.clickAnyLinkToConsent)
                {
                    jQuery("a").filter(':not(.cc-link)').unbind("click");
                }
                jQuery.each(cc.cookies, function (key, value)
                {
                    if (!value.approved && !value.asked)
                    {
                        if (enableall || jQuery('#cc-checkbox-' + key).is(':checked'))
                        {
                            cc.approved[key] = "yes";
                            cc.cookies[key].asked = true;
                        }
                        else
                        {
                            cc.approved[key] = "no";
                            cc.cookies[key].asked = true;
                            cc.allagree = false;
                        }
                        cc.setcookie('cc_' + key, cc.approved[key], 365);
                    }
                    else
                    {
                    }
                });
            }
            if (!cc.allagree && cc.settings.consenttype == "implicit")
            {
                cc.forcereload = true;
            }

            if (!cc.ismobile)
            {
                jQuery('#cc-notification').slideUp();
                if (cc.settings.bannerPosition == "cc-push")
                {
                    //detect body margin
                    jQuery('html').animate({marginTop: 0}, 400);
                }
            }
            cc.checkapproval();
            cc.reloadifnecessary();

            return false;
        },

        showminiconsent: function ()
        {
            if (jQuery('#cc-tag').length == 0)
            {
                data = '<div id="cc-tag" class="hidden cc-tag-' + cc.settings.tagPosition + '"><a class="cc-link" href="#" id="cc-tag-button" title="' + cc.getStringLocalizzata().privacySettings + '"><span>' + cc.getStringLocalizzata().privacySettings + '</span></a></div>';
                jQuery('body').prepend(data);
                jQuery('#cc-tag').addClass(cc.settings.style);
                if (!cc.settings.hideprivacysettingstab)
                {
                    jQuery('#cc-tag').fadeIn();
                }
                else
                {
                    jQuery('#cc-tag').hide();
                }
                jQuery('.cc-privacy-link').click(cc.showmodal);
                jQuery('#cc-tag-button').click(cc.showmodal);
            }
        },

        getsize: function (obj)
        {
            var size = 0, key;
            for (key in obj)
            {
                if (obj.hasOwnProperty(key))
                {
                    size++;
                }
            }
            return size;
        },

        settoken: function (data)
        {
            if (cc.reloadkey)
            {
                cc.reloadkey = false;
                if (!cc.allagree && cc.settings.consenttype == "implicit")
                {
                    cc.forcereload = true;
                }
                cc.reloadifnecessary();
            }
            cc.sessionkey = data;
        },

        showmodal: function ()
        {
            if (!cc.checkedremote && !cc.settings.disableallsites)
            {
                cc.fetchprefs();
            }
            jQuery(document).bind('keyup', cc.onkeyup);
            jQuery('body').prepend('<div id="cc-modal-overlay"></div>');
            jQuery(this).blur();
            if (cc.ismobile)
            {
                cc.setupformobile();
            }
            data = '<div id="cc-modal">' +
            '<div id="cc-modal-wrapper">' +
            '<h4>' + cc.getStringLocalizzata().privacySettingsDialogTitleA + ' <span>' + cc.getStringLocalizzata().privacySettingsDialogTitleB + '</span></h4>' +
            '<p class="cc-subtitle">' + cc.getStringLocalizzata().privacySettingsDialogSubtitle + '</p>' +

            '<div class="cc-content">' +
            '</div>' +

            '<div class="cc-clear"></div>' +

            '<p id="cc-modal-closebutton" class="cc-modal-closebutton"><a class="cc-link" href="#" title="' + cc.getStringLocalizzata().closeWindow + '"><span>' + cc.getStringLocalizzata().closeWindow + '</span></a></p>' +
            '<div id="cc-modal-footer-buttons">' +

            '<p id="cc-modal-global"><a class="cc-link" href="#" title="' + cc.getStringLocalizzata().changeForAllSitesLink + '"><span>' + cc.getStringLocalizzata().changeForAllSitesLink + '</span></a></p></div>' +
            '<a id="cc-notification-logo" class="cc-logo" target="_blank" href="http://silktide.com/cookieconsent" title="' + cc.getStringLocalizzata().poweredBy + '"><span>' + cc.getStringLocalizzata().poweredBy + '</span></a> ' +
            '<div class="cc-clear"></div>' +
            '</div>' +
            '</div>';
            jQuery('body').prepend(data);
            if (cc.settings.disableallsites)
            {
                jQuery('#cc-modal-global').hide();
            }
            jQuery('#cc-modal').addClass(cc.settings.style).click(cc.closemodals);
            if (cc.ismobile)
            {
                jQuery('#cc-modal').addClass("cc-mobile");
            }
            cc.reloadmodal();
            jQuery('#cc-modal').fadeIn();
            jQuery('#cc-modal-overlay').fadeIn();
            jQuery('#cc-modal-wrapper').click(function ()
            {
                cc.noclosewin = true;
            });
            jQuery('#cc-modal .cc-modal-closebutton a').click(function ()
            {
                cc.showhidemodal();
                cc.reloadifnecessary();
                return false;
            });
            jQuery('#cc-modal-global').click(function ()
            {
                cc.frommodal = true;
                cc.gotosettings();
                return false;
            });
            jQuery('#cc-tag-button').unbind('click').click(cc.showhidemodal);
            jQuery('.cc-privacy-link').unbind('click').click(cc.showhidemodal);

            return false;
        },

        closepreferencesmodal: function ()
        {
            jQuery.each(cc.defaultCookies, function (key, value)
            {
                value = jQuery('#cc-globalpreference-selector-' + key).val();
                if (cc.approved[key] != "yes" && cc.approved[key] != "no")
                {
                    cc.approved[key] = value;
                    cc.setcookie('cc_' + key, cc.approved[key], 365);
                }
                cc.remoteCookies[key] = value;

            });
            urlx = cc.settings.serveraddr + '?p=1&tokenonly=true&cc-key=' + cc.sessionkey;
            if (cc.remoteCookies['social'])
            {
                urlx += '&cc-cookies-social=' + cc.remoteCookies['social'];
            }
            if (cc.remoteCookies['analytics'])
            {
                urlx += '&cc-cookies-analytics=' + cc.remoteCookies['analytics'];
            }
            if (cc.remoteCookies['advertising'])
            {
                urlx += '&cc-cookies-advertising=' + cc.remoteCookies['advertising'];
            }

            cc.insertscript(urlx);

            jQuery('#cc-notification').hide().remove();
            jQuery(this).blur();
            jQuery('#cc-settingsmodal').fadeOut(null, function ()
            {
                jQuery('#cc-settingsmodal').remove();
            });
            if (!cc.frommodal)
            {
                cc.checkapproval();
                cc.reloadifnecessary();
            }
            else
            {
                cc.frommodal = false;
                cc.showhidemodal();
            }
            return false;
        },

        showhidemodal: function ()
        {
            jQuery(this).blur();
            cc.checkedlocal = false;
            cc.checkedremote = false;
            if (jQuery('#cc-modal').is(":visible") && !cc.frommodal)
            {
                cc.closingmodal = true;
                jQuery('#cc-modal-overlay').fadeToggle(null, function ()
                {
                    cc.closingmodal = false;
                });
                jQuery.each(cc.cookies, function (key, value)
                {
                    thisval = jQuery('#cc-preference-selector-' + key).val();

                    if (key == "necessary")
                    {
                        thisval = "yes";
                    }

                    if (thisval == "no")
                    {
                        cc.cookies[key].approved = false;
                        cc.approved[key] = "no";
                        cc.setcookie('cc_' + key, cc.approved[key], 365);
                    }
                    else if (thisval == "yes")
                    {
                        cc.cookies[key].approved = true;
                        cc.approved[key] = "yes";
                        cc.setcookie('cc_' + key, cc.approved[key], 365);
                    }
                    else
                    {
                        cc.cookies[key].approved = false;
                        cc.deletecookie(key);
                        delete cc.approved[key];
                    }
                    cc.cookies[key].asked = false;

                });
                cc.checkapproval();
            }
            else if (!jQuery('#cc-settingsmodal').is(":visible") && !jQuery('#cc-modal').is(":visible"))
            {
                cc.closingmodal = true;
                jQuery('#cc-modal-overlay').fadeToggle(null, function ()
                {
                    cc.closingmodal = false;
                });
            }
            if (cc.ismobile)
            {
                jQuery('#cc-modal').toggle();
            }
            else
            {
                jQuery('#cc-modal').fadeToggle();
            }
            return false;
        },


        reloadmodal: function ()
        {
            jQuery('#cc-modal-wrapper .cc-content').html('');
            if (cc.getsize(cc.cookies) > 0)
            {
                jQuery('#cc-modal-wrapper .cc-content').append('<ul></ul>');
                jQuery.each(cc.cookies, function (key, value)
                {

                    jQuery('#cc-modal-wrapper ul').append('<li id="cc-preference-element-' + key + '"><label for="cc-preference-selector-' + key + '"><strong>' + value.title + '</strong><span>' + value.description + '</span></label><select id="cc-preference-selector-' + key + '"><option value="yes">' + cc.getStringLocalizzata().preferenceConsent + '</option><option value="no">' + cc.getStringLocalizzata().preferenceDecline + '</option></select></li>');
                    if (value.link)
                    {
                        jQuery('#cc-preference-element-' + key + ' label span').append(' <a target="_blank" href="' + value.link + '" class="cc-learnmore-link">' + cc.getStringLocalizzata().learnMore + '</a>');
                    }
                    if ((key == "social" || key == "advertising" || key == "analytics") && !cc.settings.disableallsites)
                    {
                        jQuery('#cc-preference-selector-' + key).append('<option value="global">' + cc.getStringLocalizzata().preferenceUseGlobal + '</option>');
                    }
                    jQuery('#cc-change-button-allsites').unbind('click').click(function ()
                    {
                        cc.frommodal = true;
                        cc.gotosettings();
                        return false;
                    });
                    jQuery('#cc-preference-selector-' + key).change(function ()
                    {

                    });
                    if (key == "necessary")
                    {
                        jQuery('#cc-preference-selector-' + key).remove();
                    }
                    if (cc.approved[key] == "yes")
                    {
                        jQuery('#cc-preference-selector-' + key).val("yes")
                    }
                    else if (cc.approved[key] == "no")
                    {
                        jQuery('#cc-preference-selector-' + key).val("no")
                    }
                    else
                    {
                        jQuery('#cc-preference-selector-' + key).val("global")
                    }

                });
            }
            else
            {
                jQuery('#cc-modal-wrapper .cc-content').append('<p>' + cc.getStringLocalizzata().notUsingCookies + '</p>');
            }
            jQuery('.cc-content').append('<div class="cc-clear"></div>');
        },

        reloadsettingsmodal: function ()
        {
            jQuery('#cc-settingsmodal-wrapper .cc-content').html('');
            if (cc.getsize(cc.defaultCookies) > 0)
            {
                jQuery('#cc-settingsmodal-wrapper .cc-content').append('<ul></ul>');
                jQuery.each(cc.defaultCookies, function (key, value)
                {

                    jQuery('#cc-settingsmodal-wrapper ul').append('<li id="cc-globalpreference-element-' + key + '"><label for="cc-globalpreference-selector-' + key + '"><strong>' + value.title + '</strong><span>' + value.description + '</span></label><select id="cc-globalpreference-selector-' + key + '"><option value="ask">' + cc.getStringLocalizzata().preferenceAsk + '</option><option value="always">' + cc.getStringLocalizzata().preferenceAlways + '</option><option value="never">' + cc.getStringLocalizzata().preferenceNever + '</option></select></li>');
                    if (value.link)
                    {
                        jQuery('#cc-globalpreference-element-' + key + ' label span').append(' <a target="_blank" href="' + value.link + '" class="cc-learnmore-link">' + cc.getStringLocalizzata().learnMore + '</a>');
                    }
                    jQuery('#cc-globalpreference-selector-' + key).change(function ()
                    {

                    });
                    if (cc.remoteCookies[key] == "always")
                    {
                        jQuery('#cc-globalpreference-selector-' + key).val("always")
                    }
                    else if (cc.remoteCookies[key] == "never")
                    {
                        jQuery('#cc-globalpreference-selector-' + key).val("never")
                    }
                    else
                    {
                        jQuery('#cc-globalpreference-selector-' + key).val("ask")
                    }

                });
            }
            else
            {
                jQuery('#cc-settingsmodal-wrapper .cc-content').append('<p>' + cc.getStringLocalizzata().notUsingCookies + '</p>');
            }
            jQuery('#cc-settingsmodal-wrapper .cc-content').append('<div class="cc-clear"></div>');
        },

        approvedeny: function ()
        {
            key = jQuery(this).attr("id").split("-")[2];
            if (cc.cookies[key].approved)
            {
                cc.cookies[key].approved = false;
                cc.approved[key] = "no";
            }
            else
            {
                cc.cookies[key].approved = true;
                cc.approved[key] = "yes";
            }
            cc.setcookie('cc_' + key, cc.approved[key], 365);
            cc.checkapproval();
            cc.reloadmodal();
            return false;
        },

        clearalllocalcookies: function ()
        {
            var cookies = document.cookie.split(";");

            for (var i = 0; i < cookies.length; i++)
            {
                var cookie = cookies[i];
                var eqPos = cookie.indexOf("=");
                var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }
        },

        clearlocal: function ()
        {
            cc.clearalllocalcookies();
            jQuery(this).before('<p>' + cc.getStringLocalizzata().clearedCookies + '</p>')
        },

        getcurrenturl: function ()
        {
            return window.location.protocol + "//" + window.location.host + window.location.pathname;
        },

        gotosettings: function ()
        {
            if (jQuery('#cc-modal').is(":visible"))
            {
                cc.showhidemodal();
            }
            jQuery(this).blur();
            if (cc.ismobile)
            {
                cc.setupformobile();
                jQuery('#cc-notification').remove();
            }
            if (cc.frommodal)
            {
                buttontext = cc.getStringLocalizzata().backToSiteSettings;
            }
            else
            {
                buttontext = cc.getStringLocalizzata().closeWindow;
            }

            data = '<div id="cc-settingsmodal">' +
            '<div id="cc-settingsmodal-wrapper">' +
            '<h4>' + cc.getStringLocalizzata().allSitesSettingsDialogTitleA + ' <span>' + cc.getStringLocalizzata().allSitesSettingsDialogTitleB + '</span></h4>' +
            '<p class="cc-subtitle">' + cc.getStringLocalizzata().allSitesSettingsDialogSubtitle + '</p>' +
            '<div class="cc-content">' +
            '</div>' +
            '<div class="cc-clear"></div>' +
            '<p id="cc-settingsmodal-closebutton" class="cc-settingsmodal-closebutton"><a class="cc-link" href="#" title="' + buttontext + '"><span>' + buttontext + '</span></a></p>' +
            '<div id="cc-settingsmodal-footer-buttons">' +
            '<p id="cc-settingsmodal-secondclosebutton" class="cc-settingsmodal-closebutton"><a class="cc-link" href="#" title="' + buttontext + '"><span>' + buttontext + '</span></a></p>' +
            '</div>' +
            '<a id="cc-notification-logo" class="cc-logo" target="_blank" href="http://silktide.com/cookieconsent" title="' + cc.getStringLocalizzata().poweredBy + '"><span>' + cc.getStringLocalizzata().poweredBy + '</span></a> ' +
            '</div>' +
            '</div>';
            jQuery('body').prepend(data);
            cc.reloadsettingsmodal();
            jQuery('#cc-settingsmodal').addClass(cc.settings.style).click(cc.closemodals);
            jQuery('#cc-settingsmodal-wrapper').click(function ()
            {
                cc.noclosewin = true;
            });
            if (cc.ismobile)
            {
                jQuery('#cc-settingsmodal').addClass("cc-mobile");
            }
            jQuery('#cc-settingsmodal').fadeIn();
            jQuery('.cc-settingsmodal-closebutton').click(cc.closepreferencesmodal);

            return false;
        },

        setupformobile: function ()
        {
            if (!cc.hassetupmobile)
            {
                cc.hassetupmobile = true;
                jQuery('head').append('<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;">');
                if (cc.settings.style == 'cc-light')
                {
                    bgcol = '#e1e1e1';
                }
                else
                {
                    bgcol = '#1d1d1d'
                }
                jQuery('body').html('').css("margin", 0).css('width', 'auto').css("backgroundColor", bgcol).css("backgroundImage", 'none');
            }
        },

        onfirstload: function ()
        {
            if (!cc.setupcomplete && cc.initobj)
            {
                if (!(window.jQuery))
                {
                    cc.jqueryattempts++;
                    if (cc.jqueryattempts >= 5)
                    {
                        return;
                    }
                    setTimeout(cc.onfirstload, 200);
                    return;
                }
                cc.setupcomplete = true;
                cc.setup();
            }
            setTimeout(cc.afterload, 50);
            cc.checkapproval();
        },

        afterload: function ()
        {
            jQuery('.cc-button-enableall').addClass('cc-link').click(cc.onlocalconsentgiven);
            jQuery('.cc-button-enable-all').addClass('cc-link').click(cc.onlocalconsentgiven);
            jQuery.each(cc.cookies, function (key, value)
            {
                jQuery('.cc-button-enable-' + key).addClass('cc-link').click(cc.onlocalconsentgiven);
            });
        }
    }

    return cc;
}));
