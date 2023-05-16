let resizecallback,animationframeID;
let xoffset = 0;
let yoffset = 0;
let offsetupdated = false;

export function setoffsetx(offset) {
    if (xoffset === offset) {
        return;
    }
    xoffset = offset;
    offsetupdated = true;
}

export function setoffsety(offset) {
    if (yoffset === offset) {
        return;
    }
    yoffset = offset;
    offsetupdated = true;
}
export function startDrawing(backgroundCanvas,{enableFlickering=true,updateAfterMilliseconds=200,starDensity=500,minStarOpacity = 0.0,maxStarOpacity = 0.7}={}) {

    let ctx = backgroundCanvas.getContext("2d");
    let prevwidth, prevheight;


    function randomnum(min, max) {
        return min + (Math.random() * (max - min));
    }
    function randomInt(min, max) {
        return Math.floor(randomnum(min, max));
    }
    function shuffle(array) {
        let m = array.length, t, i;

        while (m) {

            i = Math.floor(Math.random() * m--);

            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
        return array;
    }

    //for negative numbers too
    function mod(n, m) {
        return ((n % m) + m) % m;
    }


    function getOpacity(oldopacity, offsetpercentage) {
        if (Math.random() < 0.5) {

            if ((oldopacity + offsetpercentage) > maxStarOpacity) {
                return maxStarOpacity - offsetpercentage;
            }
            return oldopacity + offsetpercentage;
        }
        else {

            if ((oldopacity - offsetpercentage) < minStarOpacity) {
                return minStarOpacity + offsetpercentage;
            }
            return oldopacity - offsetpercentage;
        }
    }

    function initcanvas() {
        backgroundCanvas.width = backgroundCanvas.offsetWidth;
        backgroundCanvas.height = backgroundCanvas.offsetHeight;
    }

    let stars = [];

    function addstars(numberofstars, minwidth, maxwidth, minheight, maxheight,
        minstarsize = 1, maxstarsize = 3, minrgb = 170, maxrgb = 255) {
        for (let i = 0; i < numberofstars; ++i) {
            stars.push({
                x: randomInt(minwidth, maxwidth),
                y: randomInt(minheight, maxheight),
                r: randomInt(minstarsize, maxstarsize),
                fillStyle: ['rgb(', randomInt(minrgb, maxrgb), ',', randomInt(minrgb, maxrgb), ',',
                    randomInt(minrgb, maxrgb), ',', randomnum(minStarOpacity, maxStarOpacity), ')']
            })
        }
    }

    function initstars(starDensity, minstarsize = 1, maxstarsize = 3, minrgb = 170, maxrgb = 255) {
        const numberofstars = (backgroundCanvas.width * backgroundCanvas.height * starDensity) / 1000000;
        stars.length = 0;
        addstars(numberofstars, 0, backgroundCanvas.width, 0, backgroundCanvas.height, minstarsize, maxstarsize, minrgb, maxrgb);
    }
    function updatestars(starDensity, minstarsize = 1, maxstarsize = 3, minrgb = 170, maxrgb = 255) {
        const numberofstars = (backgroundCanvas.width * backgroundCanvas.height * starDensity) / 1000000;

        //remove stars out of screen first
        stars = stars.filter((star) => {
            return ((star.x < backgroundCanvas.width) && (star.y < backgroundCanvas.height));
        })
        let diff = stars.length - numberofstars;
        if (diff > 0) {
            stars.splice(stars.length - diff, diff);
        }
        else {
            let extrawidth = backgroundCanvas.width - prevwidth;

            let extraheight = backgroundCanvas.height - prevheight;
            if (extrawidth < 0) {
                extrawidth = 0;
            }
            if (extraheight < 0) {
                extraheight = 0;
            }
            // +--------------------+------+
            // |                    |      |
            // |                    | extra|
            // |  originalarea      | width|
            // |                    | area |
            // +--------------------+      |
            // |   restarea         |      |
            // +--------------------+------+
            let originalarea = prevheight * prevwidth;
            let extrawidtharea = backgroundCanvas.height * extrawidth;
            let restarea = extraheight * prevwidth;
            let originaldensity = (stars.length * 1000000) / originalarea;

            if (starDensity > originaldensity) {
                let starstoadd = ((starDensity - originaldensity) * originalarea) / 1000000;

                addstars(starstoadd, 0, prevwidth, 0, prevheight, minstarsize, maxstarsize, minrgb, maxrgb);
            }
            else {
                let starstoremove = ((originaldensity - starDensity) * originalarea) / 1000000;

                stars.splice(stars.length - starstoremove, starstoremove);
            }
            //add stars in extra width
            let extrawidthstars = (starDensity * extrawidtharea) / 1000000;

            addstars(extrawidthstars, prevwidth, backgroundCanvas.width, 0, backgroundCanvas.height, minstarsize, maxstarsize, minrgb, maxrgb);

            //add stars in rest
            let reststars = (starDensity * restarea) / 1000000;

            addstars(reststars, 0, prevwidth, prevheight, backgroundCanvas.height, minstarsize, maxstarsize, minrgb, maxrgb);

            shuffle(stars);
            prevwidth = backgroundCanvas.width;
            prevheight = backgroundCanvas.height;
        }
    }


    function render() {

        ctx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
        // creatingcanvas
        stars.forEach(star => {

            // updateflicker
            if (enableFlickering) {
                star.fillStyle[7] = getOpacity(star.fillStyle[7], 0.1);
            }
            ctx.beginPath();
            ctx.fillStyle = star.fillStyle.join('');
            ctx.arc(mod(star.x + xoffset, backgroundCanvas.width), mod(star.y + yoffset, backgroundCanvas.height), star.r, 0, Math.PI * 2);
            ctx.fill();
        })
    }

    initcanvas();
    prevwidth = backgroundCanvas.width;
    prevheight = backgroundCanvas.height;

    initstars(starDensity);

    let previousTimeStamp;

    function starrenderloop(timestamp) {
        if (previousTimeStamp === undefined) {
            previousTimeStamp = timestamp;
            render();
        }
        else {
            const elapsed = timestamp - previousTimeStamp;

            // console.log(elapsed);
            // console.log(offsetupdated);
            if ((elapsed >= updateAfterMilliseconds) && (enableFlickering)) {
                render();

                previousTimeStamp = timestamp;
            }
            else if (offsetupdated) {
                offsetupdated = false;
                if (enableFlickering) {
                    enableFlickering = false;
                    render();
                    enableFlickering = true;
                }
                else {
                    render();
                }
            }

        }
        animationframeID=window.requestAnimationFrame(starrenderloop);
    }
    resizecallback = (event) => {

        initcanvas();
        updatestars(starDensity);
    }
    addEventListener("resize",resizecallback );

    // export {setoffset};
    animationframeID=window.requestAnimationFrame(starrenderloop);
}

export function stopDrawing()
{
    removeEventListener("resize",resizecallback);
    cancelAnimationFrame(animationframeID);
}