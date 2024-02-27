console.log("IT’S ALIVE!");

function $$ (selector, context = document) {
	return Array.from(context.querySelectorAll(selector));
}

// navLinks = $$("nav a");

// let currentLink = navLinks.find(a => a.host === location.host && a.pathname === location.pathname);
// currentLink?.classList.add("current");

let pages = [
	{url: "", title: "Home"},
    {url: "resume/", title: "Resume"},
	{url: "projects/", title: "Projects"},
    {url: "contact/", title: "Contact"},
];

let nav = document.createElement("nav");
nav.classList.toggle("menu");
document.body.prepend(nav);


document.body.insertAdjacentHTML("afterbegin",`
    <label class="color-scheme">
        Theme:
        <select>
            <option value="light dark">Automatic</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
        </select>
    </label>`
);

function setColorScheme(colorScheme) {
    document.documentElement.style.setProperty("color-scheme", colorScheme);
}

let select = document.querySelector("select");
select.addEventListener("input", function (event) {
    console.log("color scheme changed to", event.target.value);
    setColorScheme(event.target.value);
    localStorage.colorScheme = event.target.value;
});

if ("colorScheme" in localStorage) {
    setColorScheme(localStorage.colorScheme);
    select.value = localStorage.colorScheme;
}

for (let p of pages) {
    let url = p.url;
    let title = p.title;
    const ARE_WE_HOME = document.documentElement.classList.contains("home");
    url = !ARE_WE_HOME && !url.startsWith("http") ? "../" + url : url;
    // nav.insertAdjacentHTML("beforeend", `<a href="${ url }">${ title }</a>`);
    let a = document.createElement("a");
    a.href = url;
    a.textContent = title;
    nav.append(a);

    a.classList.toggle("current", a.host === location.host && a.pathname === location.pathname);
    if (a.host !== location.host && a.pathname === location.pathname) {
        a.target = "_blank";
    }
    // a.target.toggle("_blank", a.host !== location.host && a.pathname !== location.pathname);
    
    // if (a.host === location.host && a.pathname === location.pathname) {
    //     a.classList.add("current");
    // }

}

