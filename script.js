// ==========================
// Smooth Scroll
// ==========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        document.querySelector(this.getAttribute("href"))
        .scrollIntoView({
            behavior:"smooth"
        });

    });

});

// ==========================
// Navbar Background on Scroll
// ==========================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

    if(window.scrollY>40){

        navbar.style.background="rgba(15,23,42,.95)";
        navbar.style.transition=".3s";

    }

    else{

        navbar.style.background="rgba(255,255,255,.08)";

    }

});

// ==========================
// Loading Animation
// ==========================

const form=document.querySelector("form");

if(form){

form.addEventListener("submit",function(){

const btn=document.getElementById("predictBtn");

btn.disabled=true;

btn.innerHTML=`

<span class="spinner-border spinner-border-sm"></span>

&nbsp;Predicting...

`;

});

}

// ==========================
// Screen Size Slider
// ==========================

const slider=document.querySelector("input[type='range']");

if(slider){

const value=document.createElement("small");

value.style.display="block";

value.style.marginTop="8px";

value.style.color="#38bdf8";

slider.parentNode.appendChild(value);

value.innerHTML=slider.value+" inch";

slider.oninput=function(){

value.innerHTML=this.value+" inch";

}

}

// ==========================
// Fade In Animation
// ==========================

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

document.querySelectorAll(".glass-card,.tech-card,.feature-card,.stat-card")
.forEach(el=>{

el.classList.add("hidden");

observer.observe(el);

});

// ==========================
// Counter Animation
// ==========================

const counters=document.querySelectorAll(".stat-card h2");

counters.forEach(counter=>{

const update=()=>{

const target=counter.innerText;

if(isNaN(parseInt(target))) return;

let current=+counter.getAttribute("data-count") || 0;

const increment=Math.ceil(target/60);

if(current<target){

current+=increment;

counter.setAttribute("data-count",current);

counter.innerText=current;

setTimeout(update,25);

}

else{

counter.innerText=target;

}

}

update();

});

// ==========================
// Button Hover Effect
// ==========================

document.querySelectorAll(".btn").forEach(button=>{

button.addEventListener("mouseenter",()=>{

button.style.transform="translateY(-4px) scale(1.02)";

});

button.addEventListener("mouseleave",()=>{

button.style.transform="translateY(0px)";

});

});