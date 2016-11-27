Ext.define('Admin.view.pages.Error404Window', {
    extend: 'Admin.ux.window.LockingWindow',
    xtype: 'page404',

    title: 'SHAREVIEW',
    cls: 'error-page-container',
    items: [
        {
            xtype: 'container',
            width: 400,
            cls:'error-page-inner-container',
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'label',
                    cls: 'error-page-top-text',
                    text: '404'
                },
                {
                    xtype: 'label',
                    cls: 'error-page-desc',
                    html: '<div>Запрашиваемая Вами страница не найдена!</div><div>Попробуйте перейти на <a href="#dashboard">главную страницу</a></div>'
                },
                {
                    xtype: 'tbspacer',
                    flex: 1
                }
            ]
        }
    ]
});