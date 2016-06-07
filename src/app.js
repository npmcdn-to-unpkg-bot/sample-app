var userState = "none";

var plist = [{"lng":"-79.385865","lat":"43.642424","url":"http://www.ripleyaquariums.com/canada/","title":"Ripley's Aquarium","key":0},{"lng":"-79.387057","lat":"43.642566","url":"http://www.cntower.ca/en-ca/home.html","title":"CN Tower","key":1},{"lng":"-79.18589","lat":"43.817699","url":"http://www.torontozoo.com/","title":"Toronto Zoo","key":2},{"lng":"-79.394777","lat":"43.66771","url":"http://www.rom.on.ca/en","title":"Royal Ontario Museum","key":3},{"lng":"-79.392512","lat":"43.653607","url":"http://www.ago.net/","title":"Art Gallery of Ontario","key":4},{"lng":"-79.453206","lat":" 43.725887","url":"http://yorkdale.com/","title":"Yorkdale Mall","key":5},{"lng":"-79.381455","lat":"43.653597","url":"http://www.torontoeatoncentre.com/en/Pages/default.aspx","title":"Eaton Center","key":6},{"lng":"-79.38409","lat":" 43.65344","url":"http://www.toronto.ca/","title":"City Hall","key":7},{"lng":"-79.377264","lat":"43.646988","url":"http://www.hhof.com/","title":"Hockey Hall of Fame","key":8},{"lng":"-79.379099","lat":"43.643466","url":"http://www.theaircanadacentre.com/","title":"Air Canada Center","key":9}];

var gallery = ["assets/aquarium.png","assets/cntower.jpg","assets/torontozoo.jpg","assets/rom.jpg","assets/artgalleryontario.jpg","assets/yorkdalemall.jpg","assets/torontoeatoncentre.jpg","assets/torontocityhall.jpg","assets/hockey-hall-of-fame.jpg","assets/AirCanadaCentre2.jpg"];

var favPlaces = [];
/*
var localStore = localStorage;
var favsFromStorage = localStore.getItem('favPlaces');
if(favsFromStorage !== undefined && favsFromStorage !== null){
	console.log(favsFromStorage);
	favPlaces = JSON.parse(favsFromStorage);
}*/

/*
var ExampleGoogleMap = React.createClass({  
	browsePlaces:function(){
	  	ReactDOM.render(
	  		<BrowsePlaces/>,
	  		document.getElementById('content')
	  	);
	},
	viewFaves: function() {
		ReactDOM.render(
		  <BrowseFaves/>,
		  document.getElementById('content')
		);
	},
    getDefaultProps: function () {
        return {
            initialZoom: 8,
            mapCenterLat: 43.6425569,
            mapCenterLng: -79.4073126,
        };
    },
    componentDidMount: function (rootNode) {
        var mapOptions = {
            center: this.mapCenterLatLng(),
            zoom: this.props.initialZoom
        },
        map = new google.maps.Map(ReactDOM.findDOMNode, mapOptions);
        var marker = new google.maps.Marker({position: this.mapCenterLatLng(), title: 'Hi', map: map});
        this.setState({map: map});
    },
    mapCenterLatLng: function () {
        var props = this.props;
        return new google.maps.LatLng(props.mapCenterLat, props.mapCenterLng);
    },
    render: function () {
        return (
			<div>
			<button onClick={this.viewFaves}>View favourites</button> 
			<button onClick={this.browsePlaces}>Browse</button>
        	<div className='map-gic'></div>
			</div>
        );
    }
});*/


var currentGallery = 0;
var GalleryScreen = React.createClass({
	goBack: function(e) {
		ReactDOM.render(
		  <BrowsePlaces/>,
		  document.getElementById('content')
		);
	},
  render: function() {
    return (
		<div>
      		<img className="gall-img" src={gallery[currentGallery]}/>
			<br/><br/>
			<button onClick={this.goBack}>Go back</button>
		</div>
    );
  }
});

var TableList = React.createClass({
	viewGallery: function() {
		currentGallery = this.props.place.key;
		ReactDOM.render(
		  <GalleryScreen/>,
		  document.getElementById('content')
		);
	},
	toggleFavourite: function(){
		if(favPlaces[this.props.place.key] !== true){
			favPlaces[this.props.place.key] = true;
		}
		else{
			favPlaces[this.props.place.key] = false;
		}
		
		//localStore.setItem('favPlaces', JSON.stringify(favPlaces));
		
	  	ReactDOM.render(
	  		<BrowsePlaces/>,
	  		document.getElementById('content')
	  	);
	},
  render: function() {
      return (
		<tr>
		<td>{this.props.place.title}</td>
		<td><a target="_blank" href={this.props.place.url}>Website</a></td>
		<td><a onClick={this.viewGallery} href="#">View Gallery</a></td>
		<td><span onClick={this.toggleFavourite} className="favicon"><img className={ favPlaces[this.props.place.key] == true ? 'active show': "active" } src="assets/favourites_active.png"/><img src="assets/favourites.png"/></span></td>
		</tr>
      );
  }
});

var BrowseFaves = React.createClass({
    logOut: function(e) {
		e.preventDefault();
		
		userState = "none";
		
		firebase.auth().signOut().then(function() {
		  // Sign-out successful.
		}, function(error) {
		  // An error happened.
		});
    },
	browsePlaces:function(){
	  	ReactDOM.render(
	  		<BrowsePlaces/>,
	  		document.getElementById('content')
	  	);
	},
    render: function() {
		var rows = [];
		plist.forEach(function(place) {
			if(favPlaces[place.key] == true){
				rows.push(<TableList place={place} key={place.key} />);
			}
		}.bind(this));	
      return (
		<div>
			<p onClick={this.logOut} className="logout">
			  log-out
			</p>
		  	<button onClick={this.browsePlaces}>Browse</button> <button>View map</button>
			<br/><br/>
		  	<table>
	        <tbody>{rows}</tbody>
	        </table>
		</div>  
      );
    }
});

var BrowsePlaces = React.createClass({
    logOut: function() {
		e.preventDefault();
		
		userState = "none";
		
		firebase.auth().signOut().then(function() {
		  // Sign-out successful.
		}, function(error) {
		  // An error happened.
		});
    },
	viewFaves: function() {
		ReactDOM.render(
		  <BrowseFaves/>,
		  document.getElementById('content')
		);
	},
    render: function() {
		var rows = [];
		plist.forEach(function(place) {
		  rows.push(<TableList place={place} key={place.key} />);
		}.bind(this));	
	  	
      return (
		<div>
			<p onClick={this.logOut} className="logout">
			  log-out
			</p>
		  	<button onClick={this.viewFaves}>View favourites</button> <button>View map</button>
			<br/><br/>
		  	<table>
	        <tbody>{rows}</tbody>
	        </table>
		</div>  
      );
    }
});

var LoginError = React.createClass({
    loginUser: function(e) {
		e.preventDefault();
		
		ReactDOM.render(
		  <LoginScreen/>,
		  document.getElementById('content')
		);
    },
    render: function() {
      return (
        <form onSubmit={this.backToLogin}>
  		<h2>
		  Please provide a valid email and password:
  		</h2>
          
  		<br/><br/><button>Try again</button>
        </form>
      );
    }
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
	  if(userState !== "loggedIn"){
		userState = "loggedIn";
	  	ReactDOM.render(
	  		<BrowsePlaces/>,
	  		document.getElementById('content')
	  	);
	  }
	
  } else {
    // No user is signed in.
	  ReactDOM.render(
	    <LoginScreen/>,
	    document.getElementById('content')
	  );
  }
});

var LoginScreen = React.createClass({
  loginUser: function(e) {
	  e.preventDefault();
	  
	  var errorCode = "";
	  firebase.auth().signInWithEmailAndPassword(this.refs.userEmailInput.value, this.refs.userPasswordInput.value).catch(function(error) {
  	    // Handle Errors here.
  	    errorCode = error.code;
  	    var errorMessage = error.message;
		
		alert("Please provide a valid username and password");
  	    // ...
  	  });
  },
  render: function() {
    return (
      <form onSubmit={this.loginUser}>
		<h2>
		Please login:
		</h2>
        <input
          type="email"
          placeholder="Email"
		  ref="userEmailInput"
        />
        <input
          type="password"
          placeholder="Password"
		  ref="userPasswordInput"
        />
		<br/><br/><button>Login</button>
      </form>
    );
  }
});

ReactDOM.render(
  <LoginScreen/>,
  document.getElementById('content')
);
