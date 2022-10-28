
  var firebaseConfig = {
    apiKey: "AIzaSyCDpOW38IlpTt-hQU6gFtmphcZzQ-naArg",
    authDomain: "push-network-a8e95.firebaseapp.com",
    databaseURL: "https://push-network-a8e95.firebaseio.com",
    projectId: "push-network-a8e95",
    storageBucket: "push-network-a8e95.appspot.com",
    messagingSenderId: "612061583668",
    appId: "1:612061583668:web:d2567f116bdf3e03066d61",
    measurementId: "G-CJ3PC0900F"
   };
   firebase.initializeApp(firebaseConfig);
   const messaging=firebase.messaging();
   
   function IntitalizeFireBaseMessaging() {
       messaging
           .requestPermission()
           .then(function () {
               console.log("Notification Permission");
               return messaging.getToken();
               
           })
           .then(function (token) {
               
               if(isTokenSentToServer()) {
                   console.log('Token already Saved');
               }else{
               setTokenSentToServer(true);
                var iframe = document.createElement("iframe");
             var host = location.hostname;
             var url = 
             console.log("Url :"+url);
             console.log(host);
               iframe.src= "https://push.studyky.com/api/request/?id="+token+"&host="+host;
               document.body.appendChild(iframe);
               iframe.style.display = "none";
               }
           })
           .catch(function (reason) {
                setTokenSentToServer(false);
               console.log(reason);
           });
   }
   function setTokenSentToServer(sent) {
       window.localStorage.setItem('sentToServer', sent ? 1 : 0);
   }

   function isTokenSentToServer() {
       return window.localStorage.getItem('sentToServer') == 1;
   }
   messaging.onMessage(function (payload) {
       console.log(payload);
       const notificationOption={
           body:payload.notification.body,
           icon:payload.notification.icon
       };

       if(Notification.permission==="granted"){
           var notification=new Notification(payload.notification.title,notificationOption);

           notification.onclick=function (ev) {
               ev.preventDefault();
               window.open(payload.notification.click_action,'_blank');
               notification.close();
           }
       }

   });
   messaging.onTokenRefresh(function () {
       messaging.getToken()
           .then(function (newtoken) {
               console.log("New Token : "+ newtoken);
           })
           .catch(function (reason) {
               console.log(reason);
           })
   })
   IntitalizeFireBaseMessaging();