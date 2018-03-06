module.exports = {
    follow ( req, res ) {
        const db = req.app.get('db');
        const { session } = req;
        const { userId } = req.body;

        db.create_follow( [userId, session.user.id] ).then( follow => {
            res.status(200).json( follow );
        }).catch( err => {
            console.log(err)
            res.status(500).send(err);
        });
    },

    unfollow ( req, res ) {
        const db = req.app.get('db');
        const { session } = req;
        const { userId } = req.params;

        db.delete_follow( [userId, session.user.id] ).then( follow => {
            res.status(200).json('Follow removed');
        }).catch( err => {
            console.log(err)
            res.status(500).send(err);
        });
    },

    getFollows ( req, res ) {
        const db = req.app.get('db');
        const { session } =req;

        db.read_user_follows( [session.user.id] ).then( follows => {
            res.status(200).json( follows );
        }).catch( err => {
            console.log(err)
            res.status(500).send(err);
        });
    },

    getFollowers ( req, res ) {
        const db = req.app.get('db');
        const { session } =req;

        db.read_user_followers( [session.user.id] ).then( followers => {
            res.status(200).json( followers );
        }).catch( err => {
            console.log(err);
            res.status(500).send(err);
        });
    }
}