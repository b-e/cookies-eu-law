$(function ()
{
    cc.initialise(
        {
            cookies: {
                social: {},
                analytics: {},
                advertising: {}
               // necessary: {},
                //mycookieid: {
                //    title: 'My custom cookie title',
                //    description: 'Here is a description of '+
                //    'my custom type of cookie.'
                //}
            },
            settings: {
                hideallsitesbutton: true,
                privacyPolicy: true,
                privacyPolicyUrl: 'http://www.asusplus.it/app/cookie',
                bannerPosition : 'bottom',
                style: "dark"
                //style: "light",
                //bannerLang : $("html").data("lang")
            },
            strings:
            {
                //qui nuovi testi che andranno a sovrascrivere vecchi
            }
        });


    cc.checkapproval();


    //cc.onconsent('social', function()
    //{
    //    alert("Social cookies have been consented to!");
    //});
});