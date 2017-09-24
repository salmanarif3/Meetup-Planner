var config = {
    apiKey: "AIzaSyA46XexLkTcLce9H77B8nJZaiZVL7rzdrg",
    authDomain: "meetup-planner-95b0c.firebaseapp.com",
    databaseURL: "https://meetup-planner-95b0c.firebaseio.com",
    projectId: "meetup-planner-95b0c",
    storageBucket: "meetup-planner-95b0c.appspot.com",
    messagingSenderId: "486881682512"
};
firebase.initializeApp(config);

var loginEmail = document.getElementById('loginemail');
var loginPassword = document.getElementById('loginpassword');
var signupUsername = document.getElementById('signupusername');
var signupEmail = document.getElementById('signupemail');
var signupPassword = document.getElementById('signuppassword');
var contactNumber = document.getElementById('contactnumber');
var age = document.getElementById('age');
var gender = document.getElementById('gender');
var dob = document.getElementById('dob');
var mainCreateEventDiv = document.getElementById('createEventDiv');
var nearEvents = document.getElementById('nearevents');
var allPostDiv = document.getElementById('allpost');
var dataBase = firebase.database().ref('/');
var auth = firebase.auth();
var currentUser = JSON.parse(localStorage.getItem('currentUser'));


function signUp() {
    var userInfo = {
        userName: signupUsername.value,
        email: signupEmail.value,
        password: signupPassword.value,
        phoneNumber: contactNumber.value,
        userAge: age.value,
        userGender: gender.value,
        userDob: dob.value
    }
    if (signupUsername.value !== '' && signupEmail.value !== '' && signupPassword.value !== '' && contactNumber.value !== '' && age.value !== '' && gender.value !== '' && dob.value !== '') {


        auth.createUserWithEmailAndPassword(userInfo.email, userInfo.password)
            .then(function (user) {
                dataBase.child("User-Info/" + user.uid).push(userInfo);
                return user.updateProfile({ displayName: signupUsername.value })
                    .then(function () {
                        signupUsername.value = '';
                        signupEmail.value = '';
                        signupPassword.value = '';
                        contactNumber.value = '';
                        age.value = '';
                        gender.value = '';
                        dob.value = '';
                        location = 'index.html';
                    })

            })
            .catch(function (error) {
                alert(error.message);
            })
    }
    else {
        alert("Please fill all the fields for Sign Up!");
    }
}


function login() {
    var email = loginEmail.value;
    var password = loginPassword.value;

    auth.signInWithEmailAndPassword(email, password)
        .then(function (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            location = 'createevent.html';
        })
        .catch(function (error) {
            alert(error.message);
        })
}


function eventCreate() {
    var mainCard = document.createElement('div');

    mainCard.setAttribute('class', 'card card-header custom-eventCreate');

    var eventNameDiv = document.createElement('div');
    eventNameDiv.setAttribute('class', 'row');

    var eventName = document.createElement('input');
    eventName.setAttribute('class', 'col-lg-8 form-control');
    eventName.setAttribute('id', 'eventname');
    eventName.setAttribute('placeholder', 'Name of Event');
    eventNameDiv.appendChild(eventName);

    var eventDateDiv = document.createElement('div');
    eventDateDiv.setAttribute('class', 'row custom-margin-top-5px');

    var eventDate = document.createElement('input');
    eventDate.setAttribute('class', 'col-lg-8 form-control');
    eventDate.setAttribute('id', 'eventdate');
    eventDate.setAttribute('placeholder', 'Date: DD/MM/YYYY');
    eventDateDiv.appendChild(eventDate);


    var eventDayDiv = document.createElement('div');
    eventDayDiv.setAttribute('class', 'row custom-margin-top-5px');

    var eventDay = document.createElement('input');
    eventDay.setAttribute('class', 'col-lg-8 form-control');
    eventDay.setAttribute('id', 'eventday');
    eventDay.setAttribute('placeholder', 'Day');
    eventDayDiv.appendChild(eventDay);



    var eventTimingsDiv = document.createElement('div');
    eventTimingsDiv.setAttribute('class', 'row custom-margin-top-5px');

    var eventTimings = document.createElement('input');
    eventTimings.setAttribute('class', 'col-lg-8 form-control');
    eventTimings.setAttribute('id', 'eventtime');
    eventTimings.setAttribute('placeholder', 'Timing of Event');
    eventTimingsDiv.appendChild(eventTimings);


    var eventHostedByDiv = document.createElement('div');
    eventHostedByDiv.setAttribute('class', 'row custom-margin-top-5px');

    var eventHost = document.createElement('input');
    eventHost.setAttribute('class', 'col-lg-8 form-control');
    eventHost.setAttribute('id', 'eventhost');
    eventHost.setAttribute('placeholder', 'Hosted By');
    eventHostedByDiv.appendChild(eventHost);


    var eventLocationDiv = document.createElement('div');
    eventLocationDiv.setAttribute('class', 'row custom-margin-top-5px');

    var eventLocation = document.createElement('input');
    eventLocation.setAttribute('class', 'col-lg-8 form-control');
    eventLocation.setAttribute('id', 'eventlocation');
    eventLocation.setAttribute('placeholder', 'Location');
    eventLocationDiv.appendChild(eventLocation);


    var eventDescriptionDiv = document.createElement('div');
    eventDescriptionDiv.setAttribute('class', 'row custom-margin-top-5px');

    var eventDescription = document.createElement('textarea');
    eventDescription.setAttribute('class', 'col-lg-8 form-control');
    eventDescription.setAttribute('id', 'eventdescription');
    eventDescription.setAttribute('rows', '4');
    eventDescription.setAttribute('placeholder', 'Description of Event...');
    eventDescriptionDiv.appendChild(eventDescription);



    var btnPostEventDiv = document.createElement('div');
    btnPostEventDiv.setAttribute('class', 'row custom-margin-top-5px');

    var postEventBtn = document.createElement('button');
    var postEventBtnText = document.createTextNode('Post');
    postEventBtn.setAttribute('class', 'btn btn-primary form-control');

    postEventBtn.appendChild(postEventBtnText);
    btnPostEventDiv.appendChild(postEventBtn);


    postEventBtn.onclick = function () {
        eventPost();
    }





    mainCard.appendChild(eventNameDiv);
    mainCard.appendChild(eventDateDiv);
    mainCard.appendChild(eventDayDiv);
    mainCard.appendChild(eventTimingsDiv);
    mainCard.appendChild(eventHostedByDiv);
    mainCard.appendChild(eventLocationDiv);
    mainCard.appendChild(eventDescriptionDiv);
    mainCard.appendChild(btnPostEventDiv);

    mainCreateEventDiv.appendChild(mainCard);

}


function eventPost() {
    var nOfEvent = document.getElementById('eventname');
    var dOfEvent = document.getElementById('eventdate');
    var dayOfEvent = document.getElementById('eventday');
    var tOfEvent = document.getElementById('eventtime');
    var hOfEvent = document.getElementById('eventhost');
    var lOfEvent = document.getElementById('eventlocation');
    var desOfEvent = document.getElementById('eventdescription');

    var allPost = {
        eventPostedBy: currentUser.displayName,
        nameOfEvent: nOfEvent.value,
        date: dOfEvent.value,
        day: dayOfEvent.value,
        time: tOfEvent.value,
        host: hOfEvent.value,
        locationOfEvent: lOfEvent.value,
        descriptionEvent: desOfEvent.value,
        going: [0],
        notGoing: [0]
    }

    if (currentUser.displayName !== '' && nOfEvent.value !== '' && dOfEvent.value !== '' && dayOfEvent.value !== '' && tOfEvent.value !== '' && hOfEvent.value !== '' && lOfEvent.value !== '' && desOfEvent.value !== '') {
        dataBase.child('All-Post').push(allPost);
        nOfEvent.value = '';
        dOfEvent.value = '';
        dayOfEvent.value = '';
        tOfEvent.value = '';
        hOfEvent.value = '';
        lOfEvent.value = '';
        desOfEvent.value = '';
    }
    else {
        alert('Please fill all the fields properly!');
    }


}


dataBase.child('All-Post').on("child_added", function (snapshot) {
    var eventObj = snapshot.val();
    eventObj.id = snapshot.key;
    renderPost(eventObj);
})




function renderPost(event) {

    var goingFlag = 0;
    var notGoingFlag = 0;
    for (var i = 0; i < event.going.length; i++) {
        if (currentUser.uid !== event.going[i]) {
            goingFlag = 1;
        }
        else {
            goingFlag = 0;
        }
    }

    for (var i = 0; i < event.notGoing.length; i++) {
        if (currentUser.uid !== event.notGoing[i]) {
            notGoingFlag = 1;
        }
        else {
            notGoingFlag = 0;
        }
    }

    if (goingFlag === 1 && notGoingFlag === 1) {
        var mainPostCard = document.createElement('div');
        mainPostCard.setAttribute('class', 'post-custom');
        mainPostCard.setAttribute('id', 'going' + event.id);

        var postHeader = document.createElement('div');
        postHeader.setAttribute('class', 'text-center post-header-custom');
        var postHeaderText = document.createTextNode("Posted By: " + event.eventPostedBy);

        postHeader.appendChild(postHeaderText);



        var postBody = document.createElement('div');
        postBody.setAttribute('class', 'card card-body');

        var eventName = document.createElement('p');
        var eventNameText = document.createTextNode('Event: ' + event.nameOfEvent);
        eventName.appendChild(eventNameText);


        var eventDate = document.createElement('p');
        var eventDateText = document.createTextNode('Date: ' + event.date);
        eventDate.appendChild(eventDateText);


        var eventDay = document.createElement('p');
        var eventDayText = document.createTextNode('Day: ' + event.day);
        eventDay.appendChild(eventDayText);


        var eventTime = document.createElement('p');
        var eventTimeText = document.createTextNode('Time: ' + event.time);
        eventTime.appendChild(eventTimeText);


        var eventHost = document.createElement('p');
        var eventHostText = document.createTextNode('Hosted By: ' + event.host);
        eventHost.appendChild(eventHostText);


        var eventLocation = document.createElement('p');
        var eventLocationText = document.createTextNode('Location: ' + event.locationOfEvent);
        eventLocation.appendChild(eventLocationText);


        var eventDescription = document.createElement('p');
        var eventDescriptionText = document.createTextNode('Description: ' + event.descriptionEvent);
        eventDescription.appendChild(eventDescriptionText);




        postBody.appendChild(eventName);
        postBody.appendChild(eventDate);
        postBody.appendChild(eventDay);
        postBody.appendChild(eventTime);
        postBody.appendChild(eventHost);
        postBody.appendChild(eventLocation);
        postBody.appendChild(eventDescription);



        var postFooter = document.createElement('div');
        postFooter.setAttribute('class', 'card-footer');

        var goingBtn = document.createElement('button');
        var goingBtnText = document.createTextNode('Going');
        goingBtn.setAttribute('class', 'col-sm-6 btn btn-primary');
        goingBtn.appendChild(goingBtnText);


        goingBtn.onclick = function () {
            event.going.push(currentUser.uid);
            dataBase.child('All-Post/' + event.id).update(event);
            myNearEvents(event, 'going' + event.id);
        }


        var notGoingBtn = document.createElement('button');
        var notGoingBtnText = document.createTextNode('Not Interested');
        notGoingBtn.setAttribute('class', 'col-sm-6 btn btn-danger');
        notGoingBtn.appendChild(notGoingBtnText);

        notGoingBtn.onclick = function () {
            event.notGoing.push(currentUser.uid);
            dataBase.child('All-Post/' + event.id).update(event);
            var removeNotGoingEvent = document.getElementById('going' + event.id);
            allPostDiv.removeChild(removeNotGoingEvent);
        }

        postFooter.appendChild(goingBtn);
        postFooter.appendChild(notGoingBtn);


        mainPostCard.appendChild(postHeader);
        mainPostCard.appendChild(postBody);
        mainPostCard.appendChild(postFooter);



        allPostDiv.appendChild(mainPostCard);
    }
}



function myNearEvents(obj, goingObjId) {
    obj.goingObjId = goingObjId;
    dataBase.child('My-Events/' + currentUser.uid).push(obj);
    var removeGoingEvent = document.getElementById(goingObjId);
    allPostDiv.removeChild(removeGoingEvent);
}

dataBase.child('My-Events/' + currentUser.uid).on('child_added', function (snapshot) {
    var renderEventObj = snapshot.val();

    renderEvent(renderEventObj);
})


function renderEvent(obj) {
    if (obj === null) {
        nearEvents.innerHTML = 'No events yet!';
    }
    else {
        var mainEventCard = document.createElement('div');
        mainEventCard.setAttribute('class', 'post-custom');

        var eventHeader = document.createElement('div');
        eventHeader.setAttribute('class', 'text-center post-header-custom');
        var eventHeaderText = document.createTextNode("Posted By: " + obj.eventPostedBy);

        eventHeader.appendChild(eventHeaderText);


        var eventBody = document.createElement('div');
        eventBody.setAttribute('class', 'card card-body');

        var eventName = document.createElement('p');
        var eventNameText = document.createTextNode('Event: ' + obj.nameOfEvent);
        eventName.appendChild(eventNameText);


        var eventDate = document.createElement('p');
        var eventDateText = document.createTextNode('Date: ' + obj.date);
        eventDate.appendChild(eventDateText);


        var eventDay = document.createElement('p');
        var eventDayText = document.createTextNode('Day: ' + obj.day);
        eventDay.appendChild(eventDayText);


        var eventTime = document.createElement('p');
        var eventTimeText = document.createTextNode('Time: ' + obj.time);
        eventTime.appendChild(eventTimeText);


        var eventHost = document.createElement('p');
        var eventHostText = document.createTextNode('Hosted By: ' + obj.host);
        eventHost.appendChild(eventHostText);


        var eventLocation = document.createElement('p');
        var eventLocationText = document.createTextNode('Location: ' + obj.locationOfEvent);
        eventLocation.appendChild(eventLocationText);


        var eventDescription = document.createElement('p');
        var eventDescriptionText = document.createTextNode('Description: ' + obj.descriptionEvent);
        eventDescription.appendChild(eventDescriptionText);

        eventBody.appendChild(eventName);
        eventBody.appendChild(eventDate);
        eventBody.appendChild(eventDay);
        eventBody.appendChild(eventTime);
        eventBody.appendChild(eventHost);
        eventBody.appendChild(eventLocation);
        eventBody.appendChild(eventDescription);




        mainEventCard.appendChild(eventHeader);
        mainEventCard.appendChild(eventBody);

        nearEvents.appendChild(mainEventCard);

    }

}




function logout() {

    auth.signOut()
        .then(function () {
            location = 'index.html';
        })
        .catch(function (error) {
            alert(error.message);
        })
}