class FirebaseDB 
{

  constructor(firebaseID) 
  {
    this.firebase = new Firebase("https://"+firebaseID+".firebaseio.com");
  }

  get(key, callback)
  {
    this.firebase.child(key).once('value', function(e){
        callback(e.val());
    });
  }

  votePhotoID(photoID, type, callback)
  {
    this.firebase.child('photos/' + photoID + "/votes/" + type).transaction(function(current_value){
        return (current_value || 0) + 1;
    }, function(error){
        if(error)
        {
            console.log(error);
        } else {
            callback();       
        }
    });
  }
}

export default FirebaseDB;