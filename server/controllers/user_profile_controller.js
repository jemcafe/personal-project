module.exports = {
    getUser ( req, res ) {
        const db = req.app.get('db');
        const { username } = req.params;

        db.find_user( [username] ).then( user => {

            if ( user.length ) {
                const userData = {
                    id: user[0].id,
                    username: user[0].username,
                    name: user[0].name,
                    imageurl: user[0].imageurl,
                    headerbkgdimgurl: user[0].headerbkgdimgurl,
                    profileurl: user[0].profileurl
                }
                res.status(200).json( userData );
            } else {
                res.status(401).json( 'User not found' );
            }

        }).catch( err => {
            console.log(err);
            res.status(500).send(err);
        });
    },

    getPosts ( req, res ) {
        const db = req.app.set('db');
        const { username } = req.params;

        db.find_user( [username] ).then( user => {

            db.read_user_posts( [user[0].id] ).then( posts => {
                res.status(200).json( posts );
            }).catch(err => console.log(err));

        }).catch( err => {
            console.log(err);
            res.status(500).send(err);
        });
    },

    getPosters ( req, res ) {
        const db = req.app.set('db');
        const { username } = req.params;

        db.find_user( [username] ).then( user => {

            db.read_user_posters( [user[0].id] ).then( posters => {
                res.status(200).json( posters );
            }).catch(err => console.log(err));

        }).catch( err => {
            console.log(err);
            res.status(500).send(err);
        });
    },

    getRecentPosters ( req, res ) {
        const db = req.app.set('db');
        const { username } = req.params;

        db.find_user( [username] ).then( user => {

            db.read_user_posters( [user[0].id] ).then( posters => {
                
                let recentPosters = []; 
                if ( posters.length <= 3 ) {
                    for ( let i = 0; i < posters.length; i++ ) { recentPosters.push(posters[i]) }
                } else {
                    for ( let i = 0; i < 3; i++ ) { recentPosters.push(posters[i]) }
                }
                res.status(200).json( recentPosters );
    
            }).catch(err => console.log(err));

        }).catch( err => {
            console.log(err);
            res.status(500).send(err);
        });
    },

    getFollows ( req, res ) {
        const db = req.app.get('db');
        const { username } = req.params;

        db.find_user( [username] ).then( user => {

            db.read_user_follows( [user[0].id] ).then( follows => {
                res.status(200).json( follows );
            }).catch(err => console.log(err));

        }).catch( err => {
            console.log(err);
            res.status(500).send(err);
        });
    },

    getFollowers ( req, res ) {
        const db = req.app.get('db');
        const { username } = req.params;

        db.find_user( [username] ).then( user => {

            db.read_user_followers( [user[0].id] ).then( followers => {
                res.status(200).json( followers );
            }).catch(err => console.log(err));

        }).catch( err => {
            console.log(err);
            res.status(500).send(err);
        }); 
    }
}