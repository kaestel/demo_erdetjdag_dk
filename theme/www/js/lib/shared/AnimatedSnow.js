AnimatedSnow = new function(){

    this.setupSnow = function(stage,renderer){
        this.stage = stage
        this.renderer = renderer
        // Snow Look
        this.snowAmount = 200; // The number of snowflakes
        this.snowSize = 1; // Scale of individual snowflakes. 1 is normal, 2 is double, 0.5 is half

        this.snowContainer = new PIXI.particles.ParticleContainer(this.snowAmount, {
            scale: true,
            position: true,
            rotation: true,
            //uvs: true,
            alpha: true
        });
        this.stage.addChild(this.snowContainer);

        //this.snowContainer = new PIXI.particles.ParticleContainer();
        //this.stage.addChild(this.snowContainer);
        this.tracer = true; // If true, //console.log() windforce values in the output panel

        // Snow behavior
        this.intro = false; // If true, the snowflakes will appear from the top left hand corner, instead of directly filling the screen.
        this.fade = false; // If true, the snowflakes will appear using opacity


        // Snow distance
        this.snowZmin = 0.47; // The min snowflake distance : 0 is close, 1 is far
        this.snowZmax = 0.48; // The max snowflake distance : 0 is close, 1 is far

        // Snow Opacity
        this.snowAlphaMin = 1; // The minimum alpha value
        this.snowAlphaMax = 1; // The maximum alpha value

        // Snow Rotation
        this.snowRotation = 1 // Rotation animation. 0.5 is half, 2 is double.

        // Gravity
        this.gravity = 100; // Speed of fall. 100 is the normal speed. 0 to float, -100 to inverse the direction.

        // Wind Force
        this.windBegin = 200; // The inital wind when the snow starts, then it smoothly changes to the normal values
        this.windForceMin = 0; // The minimum force of the wind
        this.windForceMax = 200; // The maximum force of the wind


        // Wind Direction
        this.windDirection = "both" // You can chose between "left", "right", and "both"

        // Wind duration
        this.windTimeMin = 1;
        this.windTimeMax = 6;

        this.flakes = [];
        this.sw = this.renderer.width;
        this.sh = this.renderer.height;
        this.margin = 20;

        this.nWind = null;
        this.wind = {};
        this.wind.max = this.windForceMax
        this.wind.min = this.windForceMin
        this.wind.dir = this.windDirection

        if(this.wind.dir == "right") {
            this.wind.force = this.windBegin
        } else if(this.wind.dir == "left") {
            this.wind.force = -this.windBegin
        } else {
            this.wind.force = this.windBegin
        }


        this.windRandom();
        this.ok = true;

        this.initSnow();
        this.nAlpha = 1
        return this;
    }


    this.windRandom = function() {
        if(this.wind.dir == "right") {
            this.nWind = Math.random()*(this.wind.max-this.wind.min)+this.wind.min
        } else if(this.wind.dir == "left") {
            this.nWind = -Math.random()*(this.wind.max-this.wind.min)-this.wind.min
        } else {
            this.nWind = Math.random()*(this.wind.max*2-this.wind.min)-this.wind.min-this.wind.max
        }
        if(this.tracer == true) {
        }
        TweenLite.to(this.wind, Math.random()*3+1, {force:this.nWind, delay:Math.random()*(this.windTimeMax-this.windTimeMin)+this.windTimeMin, onComplete:this.windRandom.bind(this)});
    }


    this.initSnow = function() {
        
        if(this.snowAmount >= 10000) {
           this.ok = false;
        }
        
        if(this.snowSize > 10) {
           this.ok = false;
        }
        
        if(this.snowZmin > this.snowZmax) {
           this.ok = false;
        }
            
        if(this.windForceMin > this.windForceMax) {
           this.ok = false;
        }
        
        if(this.snowAlphaMin > this.snowAlphaMax) {
           this.ok = false;
        }
        
        if(this.windTimeMin > this.windTimeMax) {
           this.ok = false;
        }
        
        if(this.ok == true) {
            for (var i=0; i<this.snowAmount; i++) {
                this.createSnow(i);
            }
        }
    }

    this.createSnow = function(i) {
        var mTexture = PIXI.Texture.fromImage('images/flocon.png');
        var m = new PIXI.Sprite(mTexture);
        m.anchor.set(0.5,0.5);

        
        if(this.intro == true) {
            m.y = Math.random() * - this.margin *2;
            m.x = Math.random() * (this.sw / 2 + this.margin) - this.margin * 2;
        } else {
            m.y = Math.random() * (this.sh + this.margin*2) - this.margin*2;
            m.x = Math.random() * (this.sw + this.margin*2) - this.margin*2;
        }
        
        m.rotation = (Math.random() * 360)*PIXI.DEG_TO_RAD;


        m.depth = Math.random() * (this.snowZmax*2-this.snowZmin) + this.snowZmin
        m.depth = (m.depth*100)/100


        m.scale.x = m.scale.y = (Math.max(0.4, (1/(Math.max(0, m.depth))-0.5)*this.snowSize))/1;
        if(this.fade == true) {
            m.alpha = 0;
        } else {
            m.alpha = this.newAlpha(m);
        }
        this.snowContainer.addChild(m);
        this.flakes.push(m);
        this.snowX(m);
        this.snowY(m);
    }


    this.newAlpha = function (m) {
        if(m.scale.x < 2*this.snowSize) {
            this.nAlpha = (Math.random()*(this.snowAlphaMax-this.snowAlphaMin)+this.snowAlphaMin)
        } else if(m.scale.x > 2*this.snowSize && m.scale.x < 4*this.snowSize) {
            this.nAlpha = (Math.random()*(this.snowAlphaMax-this.snowAlphaMin)+this.snowAlphaMin)*0.6
        } else if(m.scale.x > 4*this.snowSize) {
            this.nAlpha = (Math.random()*(this.snowAlphaMax-this.snowAlphaMin)+this.snowAlphaMin)*0.4
        }
        return this.nAlpha;
    }

    this.snowX = function (m) {
        this.xReset(m);
        TweenLite.to(m, Math.random()*2+1, {alpha:this.newAlpha(m), x:m.x+(Math.random()*80-40+this.wind.force)*(m.scale.x), rotation:(Math.random()*this.snowRotation*900)*PIXI.DEG_TO_RAD, onComplete:this.snowX.bind(this), onCompleteParams:[m], ease:Quad.easeInOut, overwrite:false});
    }

    this.snowY = function(m) {
        this.yReset(m);
        TweenLite.to(m, Math.random()*2+1, {y:m.y+(Math.random()*(this.gravity/2)+(this.gravity/2))*(m.scale.x)*3, onComplete:this.snowY.bind(this), onCompleteParams:[m], ease:Linear.easeInOut, overwrite:false});
    }
    this.killEvent = function() {
        for(var i = 0;i<this.flakes.length;i++){
            TweenLite.killTweensOf(this.flakes[i]);
        }
    }
    this.xReset = function(m) {
        if (m.x > this.sw + this.margin) {
            m.x = Math.random() * -this.margin;
        } else  if (m.x < -this.margin) {
            m.x = this.sw + Math.random() * this.margin;
        }
    }

    this.yReset = function(m) {
        if (m.y > this.sh + this.margin) {
            m.y = Math.random() * -this.margin;
        } else if (m.y < -this.margin) {
            m.y = this.sh + Math.random() * this.margin;
        }
    }
}