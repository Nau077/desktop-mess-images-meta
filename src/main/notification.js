const { Notification } = require( 'electron' );

// display files added notification
exports.filesAdded = ( size ) => {
    const notif = new Notification( {
        title: 'Files added',
        body: `${ size } file(s) has been successfully added.`
    } );

    notif.show();
};

exports.filesMetaChanged = ( size ) => {
    const notif = new Notification( {
        title: 'Files meta changed',
        body: `${ size } file(s) meta info has been successfully changed.`
    } );

    notif.show();
};
