var AnimatedBanner = function() {

	this.config = {
		width: 930,
		height: 180,

		isPoliteBanner: true,

		maxLoops: 3,
		maxAnimationTime: 0,

		renderer: {
//			scale: true,
			containerSelector: "#Animated",
			backgroundColor: 0x002c71,
			assetsBaseUrl: 'images/',
			transparent: false,
			antialias: false,
			resize:true
		},

		// absolute or relative path to fallback background image (or false to override fallback detection)
		fallback: "images/bg.jpg"

	}

	// Load asses
	this.loadQueue = [
		"bbar.png",
		"truck.png",
	];


	// Do initial setup of assets
	this.init = function() {
		this.loops = 0;
		this.maxLoops = 3;
		// this.stage.addChild(this.assets.bg);
		this.snow = AnimatedSnow.setupSnow(this.stage,this.renderer);

		var texture = PIXI.Texture.fromImage('images/truck.png');
		this.truck = new PIXI.extras.TilingSprite(
		    texture,
		    2500,
		    100
		);
		this.stage.addChild(this.truck);
		this.truck.y = this.renderer.height-114;

		var texture = PIXI.Texture.fromImage('images/bbar.png');
		this.bbar = new PIXI.extras.TilingSprite(
		    texture,
		    2500,
		    34
		);
		this.stage.addChild(this.bbar);
		this.bbar.y = this.renderer.height-34;

	}


	// Optional Callback on resize (for resize:true banners only)
	// Can be commented out when not needed
	this.resized = function(event) {

		// You have to variable available with the updated banner width and height
		// AnimatedCore.banner_w
		// AnimatedCore.banner_h
		if(this.assets) {

			// this.assets.bg.width = AnimatedCore.banner_w;
			// this.assets.bg.height = AnimatedCore.banner_h;
			this.snow.sw = AnimatedCore.banner_w;
			this.snow.sh = AnimatedCore.banner_h;
			this.bbar.y = AnimatedCore.banner_h-34;
			this.truck.y = AnimatedCore.banner_h-114;

		}

	}

	// Start animating!
	this.start = function() {
		// this.frame1In();
		var content = document.querySelector("#content");
		content.style.opacity = 1;
	}

	this.setupClickTag = function() {
	}



	this.onBannerRender = function() {
//		console.log("render banner");
		this.truck.tilePosition.x += 2;
	}


	this.onBannerStopped = function() {
//		console.log("banner stopped");
	}

}
