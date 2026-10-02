import "../css/main.css"
import "../css/swiper.css"
import "../css/filimoSlider.css"
import "../css/settings.css"

import Swiper from "swiper/bundle";

const API_URL = "http://localhost:3000";

async function apiFetch(endpoint) {
    if (import.meta.env.DEV) {
        return fetch(`${API_URL}/${endpoint}`);
    }

    const response = await fetch(`${import.meta.env.BASE_URL}db.json`);

    if (!response.ok) {
        throw new Error(`خطا در دریافت db.json: ${response.status}`);
    }

    const db = await response.json();

    return new Response(
        JSON.stringify(db[endpoint]),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
}
async function getMovieCategories() {
    try {
        const response = await apiFetch("movieCategories");

        if (!response.ok) {
            throw new Error("خطا در دریافت دسته‌بندی فیلم‌ها");
        }

        const categories = await response.json();

        const movieCategories = document.getElementById("movie-categories");

        movieCategories.innerHTML = "";

        categories.forEach(function (category) {

            const li = document.createElement("li");

            const a = document.createElement("a");

            a.href = "#";
            a.innerText = category.title;

            a.className =
                "block px-4 py-2 rounded hover:bg-[#2f2f2f] " +
                "transition-colors duration-200 font-[filimoDemo] text-xs";

            li.appendChild(a);

            movieCategories.appendChild(li);
        });

    } catch (error) {
        console.error("خطا:", error);
    }
}

getMovieCategories();
async function getSeriesCategories() {
    try {
        const response = await apiFetch("seriesCategories");

        if (!response.ok) {
            throw new Error("خطا در دریافت دسته‌بندی سریال‌ها");
        }

        const categories = await response.json();

        const seriesCategories = document.getElementById("series-categories");

        seriesCategories.innerHTML = "";

        categories.forEach(function (category) {

            const li = document.createElement("li");

            const a = document.createElement("a");

            a.href = "#";
            a.innerText = category.title;

            a.className =
                "block px-4 py-2 rounded hover:bg-[#2f2f2f] " +
                "transition-colors duration-200 font-[filimoDemo] text-xs";

            li.appendChild(a);

            seriesCategories.appendChild(li);
        });

    } catch (error) {
        console.error("خطا:", error);
    }
}

getSeriesCategories();
async function getCollections() {
    try {
        const response = await apiFetch("collections");

        if (!response.ok) {
            throw new Error("خطا در دریافت مجموعه‌ها");
        }

        const collections = await response.json();

        const collectionsList = document.getElementById("collections");

        collectionsList.innerHTML = "";

        collections.forEach(function (collection) {

            const li = document.createElement("li");

            const a = document.createElement("a");

            a.href = "#";
            a.innerText = collection.title;

            a.className =
                "block px-4 py-2 rounded hover:bg-[#2f2f2f] " +
                "transition-colors duration-200 font-[filimoDemo] text-xs";

            li.appendChild(a);

            collectionsList.appendChild(li);
        });

    } catch (error) {
        console.error("خطا:", error);
    }
}

getCollections();
async function getSwiperSlides() {
    try {
        const response = await apiFetch("swiperSlides");

        if (!response.ok) {
            throw new Error("خطا در دریافت اسلایدها");
        }

        const slides = await response.json();

        const swiperWrapper = document.getElementById("swiper-wrapper");

        if (!swiperWrapper) return;

        swiperWrapper.innerHTML = "";

        slides.forEach(function (slide) {

            const slideElement = document.createElement("div");

            slideElement.className =
                "swiper-slide relative flex items-center overflow-hidden";

            slideElement.innerHTML = `
            <img
            src="${fixImagePath(slide.image)}"
            alt="${slide.title}"
            class="absolute inset-0 h-full w-full object-cover object-top"
        />

                <div class="absolute inset-0 bg-black/40"></div>

                <div class="relative z-10 flex h-full w-full items-center px-4 sm:px-8 lg:px-16">

                    <div class="flex flex-col gap-3 text-white w-[250px] sm:w-[300px] lg:w-[350px] ml-auto text-right">

                    <img
                    class="w-1 h-1 mb-1"
                    src="${fixImagePath(slide.icon)}"
                    alt="icon"
                />

                        ${
                            slide.schedule
                            ? `
                                <button class="w-full sm:w-auto inline-flex items-center cursor-pointer justify-center rounded-xl bg-black px-3 py-2 text-white font-semibold text-xs transition font-[filimoDemo]">
                                    <span>${slide.schedule}</span>
                                </button>
                            `
                            : ""
                        }

                        <h2 class="text-lg sm:text-xl font-bold leading-tight font-[filimoDemo]">
                            ${slide.title}
                        </h2>

                        ${
                            slide.type
                            ? `
                                <div class="ml-auto flex w-fit items-center gap-1 justify-end">

                                    <svg
                                        class="h-4 w-4 flex-shrink-0"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fill="#f5b83f"
                                            fill-rule="evenodd"
                                            d="m22 6.44-18-2v15.11l18-2zM0 0l24 4v16L0 24z"
                                        />
                                    </svg>

                                    <span class="text-xs sm:text-sm opacity-80 font-[filimoDemo]">
                                        ${slide.type}
                                    </span>

                                </div>
                            `
                            : ""
                        }

                        <div class="flex flex-col sm:flex-row items-center gap-2 mt-3">

                            ${
                                slide.buttonType === "cinema"
                                ? `
                                    <button class="w-full sm:w-auto inline-flex items-center cursor-pointer justify-center rounded-xl bg-[#df3737] px-3 py-2 text-white font-semibold text-xs hover:bg-[#da3543] transition">
                                        <span class="font-[filimoDemo]">
                                            ورود به سینمای آنلاین
                                        </span>
                                    </button>
                                `
                                : `
                                    <button class="w-full sm:w-auto inline-flex items-center cursor-pointer justify-center rounded-xl bg-white px-3 py-2 text-black font-semibold text-xs hover:bg-amber-100 transition">
                                    <span class="font-[filimoDemo]">
                                        اطلاعات بیشتر
                                    </span>
                                </button>
                            `
                        }

                        ${
                            slide.hasPlay
                            ? `
                                <button class="w-full sm:w-auto inline-flex items-center cursor-pointer justify-center rounded-xl border border-white/40 bg-white/10 px-3 py-2 text-white text-xs hover:bg-white/20 transition">

                                    <svg
                                        class="h-4 w-4 mr-1"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M8 5v14l11-7z" />
                                    </svg>

                                    <span class="font-[filimoDemo]">
                                        پخش
                                    </span>

                                </button>
                            `
                            : ""
                        }

                    </div>

                </div>

            </div>
        `;

        swiperWrapper.appendChild(slideElement);
    });

} catch (error) {
    console.error("خطا:", error);
}
}

getSwiperSlides();
async function getSpecialItems() {
    try {
        const response = await apiFetch("specialItems");

        if (!response.ok) {
            throw new Error("خطا در دریافت آیتم‌های ویژه");
        }

        const specialItems = await response.json();

        const specialGrid = document.getElementById("special-items-grid");

        if (!specialGrid) {
            return;
        }

        const images = specialGrid.querySelectorAll("img");

        specialItems.forEach(function (item, index) {

            if (images[index]) {
                images[index].src = fixImagePath(item.image);
                images[index].alt = item.title;
            }

        });

    } catch (error) {
        console.error("خطا:", error);
    }
}

getSpecialItems();
async function getFilters() {
    try {
        const response = await apiFetch("filters");

        if (!response.ok) {
            throw new Error("خطا در دریافت فیلترها");
        }

        const filters = await response.json();

        Object.keys(filters).forEach(function (filterName) {

            const menu = document.querySelector(
                `[data-menu="${filterName}"]`
            );

            if (!menu) {
                return;
            }

            menu.innerHTML = "";

            filters[filterName].forEach(function (option) {

                const item = document.createElement("button");

                item.type = "button";
                item.innerText = option;

                item.className =
                    "block w-full text-right px-3 py-2 rounded-md " +
                    "text-xs font-[filimoDemo] text-[#e8e8e8] " +
                    "hover:bg-[#3a3a3a] transition-colors";

                menu.appendChild(item);
            });
        });

    } catch (error) {
        console.error("خطا:", error);
    }
}

getFilters();
const filterButtons = document.querySelectorAll(".filter-button");

filterButtons.forEach(function (button) {

    button.addEventListener("click", function (event) {

        event.stopPropagation();

        const filterName = button.dataset.filter;

        const menu = document.querySelector(
            `[data-menu="${filterName}"]`
        );
        document.querySelectorAll(".filter-menu").forEach(function (otherMenu) {

            if (otherMenu !== menu) {
                otherMenu.classList.add("hidden");
            }

        });
        menu.classList.toggle("hidden");

    });

});
document.addEventListener("click", function () {

    document.querySelectorAll(".filter-menu").forEach(function (menu) {
        menu.classList.add("hidden");
    });

});
document.querySelectorAll(".filter-menu").forEach(function (menu) {

    menu.addEventListener("click", function (event) {
        event.stopPropagation();
    });

});
function fixImagePath(path) {
    if (!path) return "";

    if (path.startsWith("/filimo/")) {
        return path;
    }

    if (path.startsWith("/")) {
        return `/filimo${path}`;
    }

    if (path.startsWith("./public/")) {
        return `${import.meta.env.BASE_URL}${path.replace("./public/", "")}`;
    }

    return path;

}
async function getComedyPlus() {
    try {
        const response = await apiFetch("comedyPlus");

        if (!response.ok) {
            throw new Error("خطا در دریافت کمدی پلاس");
        }

        const comedyPlus = await response.json();

        const wrapper = document.getElementById("comedy-plus-wrapper");

        if (!wrapper) {
            return;
        }

        wrapper.innerHTML = "";

        comedyPlus.forEach(function (item) {
        
            const slide = document.createElement("div");
        
            slide.className = "swiper-slide";
        
            slide.innerHTML = `
                <div class="w-40 flex flex-col items-center">
        
                    <img
                        src="${fixImagePath(item.image)}"
                        alt="${item.title}"
                        class="w-full h-56 rounded-lg object-cover"
                    />
        
                    <span class="text-[#e8e8e8] text-[12px] mt-2 text-center font-[filimoDemo] text-xs cursor-pointer">
                        ${item.title}
                    </span>
        
                </div>
            `;
        
            wrapper.appendChild(slide);
        });

    } catch (error) {
        console.error("Comedy Plus Error:", error);
    }
}

getComedyPlus();
async function getTazeha() {
    try {
        const response = await apiFetch("newReleases");

        if (!response.ok) {
            throw new Error("خطا در دریافت تازه‌ها");
        }

        const tazeha = await response.json();

        const wrapper = document.getElementById("tazeha-wrapper");

        if (!wrapper) {
            return;
        }

       wrapper.innerHTML = "";

        tazeha.forEach(function (item) {

            const slide = document.createElement("div");

            slide.className = "swiper-slide";

            slide.innerHTML = `
                <div class="w-40 flex flex-col items-center">

                    <img
                        src="${fixImagePath(item.image)}"
                        alt="${item.title}"
                        class="w-full h-56 rounded-lg object-cover"
                    />

                    <span class="text-[#e8e8e8] text-[12px] mt-2 text-center font-[filimoDemo] text-xs cursor-pointer">
                        ${item.title}
                    </span>

                </div>
            `;

            wrapper.appendChild(slide);
        });

    } catch (error) {
        console.error("Tazeha Error:", error);
    }
}

getTazeha();
async function getFilimoSchool() {
    try {
        const response = await apiFetch("filimoSchool");

        if (!response.ok) {
            throw new Error("خطا در دریافت فیلیمو مدرسه");
        }

        const filimoSchool = await response.json();

        const section = document.getElementById("filimo-school");

        if (!section) {
            return;
        }

    
        const logo = section.querySelector("img");

        if (logo) {
            logo.src = fixImagePath(filimoSchool.logo);
        }

    
        const subtitle = section.querySelector("h5");

        if (subtitle) {
            subtitle.textContent = filimoSchool.subtitle;
        }

     
        const gradesWrapper = document.getElementById("filimo-school-grades");

        if (gradesWrapper) {

            gradesWrapper.innerHTML = "";

            filimoSchool.grades.forEach(function (grade) {

                const gradeItem = document.createElement("div");

                gradeItem.className =
                    "flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.04] px-3 py-2 text-white backdrop-blur-sm cursor-pointer hover:bg-black/10 transition";

                if (grade.number) {
                    gradeItem.innerHTML = `
                        <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2b3934] border border-white/15 text-xs text-white">
                            ${grade.number}
                        </span>

                        <span class="text-sm font-[filimoDemo]">
                            ${grade.title}
                        </span>
                    `;
                } else {
                    gradeItem.innerHTML = `
                        <span class="text-sm font-[filimoDemo]">
                            ${grade.title}
                        </span>
                    `;
                }

                gradesWrapper.appendChild(gradeItem);
            });
        }

const featuresWrapper = document.getElementById("filimo-school-features");

if (featuresWrapper) {

    featuresWrapper.innerHTML = "";

    filimoSchool.features.forEach(function (feature) {

        const featureItem = document.createElement("div");

        featureItem.className =
            "flex items-center justify-center gap-2 text-white";

        let icon = "";

        if (feature.icon === "teacher") {

            icon = `
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                    class="h-6 w-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"
                    />
                    <circle cx="9" cy="7" r="4"/>
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19 8v6M22 11h-6"
                    />
                </svg>
            `;

        } else if (feature.icon === "book") {

            icon = `
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                    class="h-6 w-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 6v15M4 4.5A2.5 2.5 0 016.5 2H20v17H6.5A2.5 2.5 0 014 16.5v-12z"
                    />
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4 16.5A2.5 2.5 0 016.5 14H20"
                    />
                </svg>
            `;

        } else if (feature.icon === "exam") {

            icon = `
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                    class="h-6 w-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8 3h8l3 3v15H5V3h3z"
                    />
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8 3v4h8V3M8 12h8M8 16h5"
                    />
                </svg>
            `;

        } else if (feature.icon === "star") {

            icon = `
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                    class="h-6 w-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 3l2.2 4.8L19 10l-4.8 2.2L12 17l-2.2-4.8L5 10l4.8-2.2L12 3z"
                        />
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19 16l.8 1.7L21.5 18l-1.7.8L19 20.5l-.8-1.7-1.7-.8 1.7-.8L19 16z"
                        />
                    </svg>
                `;
            }

            featureItem.innerHTML = `
                ${icon}

                <span class="font-bold text-sm font-[filimoDemo]">
                    ${feature.title}
                </span>
            `;

            featuresWrapper.appendChild(featureItem);
        });
    }
    } catch (error) {
        console.error("Filimo School Error:", error);
    }
}

getFilimoSchool();
async function getIraniSeries() {
    try {
        const response = await apiFetch("iraniSeries");

        if (!response.ok) {
            throw new Error("خطا در دریافت سریال‌های ایرانی");
        }

        const iraniSeries = await response.json();

        const wrapper = document.getElementById("irani-wrapper");

        if (!wrapper) {
            return;
        }

        wrapper.innerHTML = "";

        iraniSeries.forEach(function (item) {
            const slide = document.createElement("div");

            slide.className = "swiper-slide";

            slide.innerHTML = `
                <div class="w-full">
                    <img
                        src="${fixImagePath(item.image)}"
                        alt="${item.title}"
                        class="w-full rounded-xl object-cover"
                    />
                    <h3 class="mt-2 text-center text-sm text-white font-[filimoDemo]">
                        ${item.title}
                    </h3>
                </div>
            `;

            wrapper.appendChild(slide);
        });

    } catch (error) {
        console.error("Irani Series Error:", error);
    }
}
getIraniSeries();
async function getHot() {
    try {
        const response = await apiFetch("hot");

        if (!response.ok) {
            throw new Error("خطا در دریافت داغ‌ترین‌ها");
        }

        const hot = await response.json();

        const wrapper = document.getElementById("hot-wrapper");

        if (!wrapper) {
            return;
        }

        wrapper.innerHTML = "";

        hot.forEach(function (item) {
            const slide = document.createElement("div");

            slide.className = "swiper-slide";

            slide.innerHTML = `
                <div class="w-40 flex flex-col items-center">
                    <img
                        src="${fixImagePath(item.image)}"
                        alt="${item.title}"
                        class="w-full h-56 rounded-lg object-cover"
                    />
                    <span class="text-[#e8e8e8] text-[12px] mt-2 text-center font-[filimoDemo] cursor-pointer">
                        ${item.title}
                    </span>
                </div>
            `;

            wrapper.appendChild(slide);
        });

    } catch (error) {
        console.error("Hot Error:", error);
    }
}

getHot();
async function getJenaei() {
    try {
        const response = await apiFetch("jenaei");

        if (!response.ok) {
            throw new Error("خطا در دریافت جنایی");
        }

        const jenaei = await response.json();

        const wrapper = document.getElementById("jenaei-wrapper");

        if (!wrapper) {
            return;
        }

        wrapper.innerHTML = "";

        jenaei.forEach(function (item) {
            const slide = document.createElement("div");

            slide.className = "swiper-slide";

            slide.innerHTML = `
                <div class="w-40 flex flex-col items-center">
                    <img
                        src="${fixImagePath(item.image)}"
                        alt="${item.title}"
                        class="w-full h-56 rounded-lg object-cover"
                    />
                    <span class="text-[#e8e8e8] text-[12px] mt-2 text-center font-[filimoDemo] cursor-pointer">
                        ${item.title}
                    </span>
                </div>
            `;

            wrapper.appendChild(slide);
        });

    } catch (error) {
        console.error("Jenaei Error:", error);
    }
}

getJenaei();
async function getFooter() {
    try {
        const response = await apiFetch("footer");

        if (!response.ok) {
            throw new Error("خطا در دریافت فوتر");
        }

        const footer = await response.json();

        const linksWrapper = document.getElementById("footer-links");
        const socialWrapper = document.getElementById("social-links");

        if (linksWrapper) {
            linksWrapper.innerHTML = "";

            footer.links.forEach(function (item) {
                const link = document.createElement("a");

                link.href = "#";
                link.className =
                    "text-[#e8e8e8] hover:bg-[#2b2b2b] px-2 py-1 rounded-xs transition-colors duration-200 cursor-pointer font-[filimoDemo] text-[11px] lg:text-xs";

                link.textContent = item.title;

                linksWrapper.appendChild(link);
            });
        }

        if (socialWrapper) {
            socialWrapper.innerHTML = "";

            footer.socialLinks.forEach(function (item) {
                const link = document.createElement("a");

                link.href = "#";
                link.className =
                    "block px-4 py-2 text-[11px] lg:text-[12px] text-[#e8e8e8] hover:bg-[#2b2b2b] transition-colors font-[filimoDemo]";

                link.textContent = item.title;

                socialWrapper.appendChild(link);
            });
        }

    } catch (error) {
        console.error("Footer Error:", error);
    }
}

getFooter();
new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

new Swiper(".heroSwiper", {
    slidesPerView: 2,
    spaceBetween: 10,
    loop: true,

    navigation: {
        nextEl: ".heroSwiper .swiper-button-next",
        prevEl: ".heroSwiper .swiper-button-prev",
    },

    breakpoints: {
        640: {
            slidesPerView: 4,
            spaceBetween: 15,
        },
        768: {
            slidesPerView: 6,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 8,
            spaceBetween: 20,
        },
    },
});
