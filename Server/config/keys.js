// add this file to .gitignore

module.exports = {
        google: {
            clientID: '159830837090-ktoea1knpsho8tvgo2q82sfi7bihf994.apps.googleusercontent.com',//dailyTap Google OAuth
            clientSecret: 't_vdl85jvBlCmEj7Ok4o4QGv'
        },
        mongodb: {
            dbURI: 'mongodb://admin:admin@dailytapcluster-shard-00-00-ds9sz.mongodb.net:27017,dailytapcluster-shard-00-01-ds9sz.mongodb.net:27017,dailytapcluster-shard-00-02-ds9sz.mongodb.net:27017/test?ssl=true&replicaSet=DailyTapCluster-shard-0&authSource=admin&retryWrites=true'
        },
        session: {
            cookieKey: 'thenetninjaisawesomeiguess'
        }
};
