console.log("FILIMO SCHOOL JS CONNECTED");
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

async function getFilimoSchoolGrades() {
    try {
        const response = await apiFetch("filimoSchoolPage");

        if (!response.ok) {
            throw new Error("خطا در دریافت پایه‌های تحصیلی");
        }

        const data = await response.json();

        if (!data.grades) {
            return;
        }

        const gradeLinks = document.querySelectorAll(
            "#grade-links a"
        );
        data.grades.forEach(function (grade, index) {

            if (gradeLinks[index]) {

                if (grade.number) {
                    gradeLinks[index].textContent =
                        `پایه‌ی ${grade.number}`;
                } else {
                    gradeLinks[index].textContent =
                        grade.title;
                }

            }

        });

    } catch (error) {
        console.error("Filimo School Grades Error:", error);
    }
}

getFilimoSchoolGrades();
async function getFilimoSchoolLessons() {
    try {
        const response = await apiFetch("filimoSchoolPage");

        if (!response.ok) {
            throw new Error("خطا در دریافت تصاویر آموزشی");
        }

        const data = await response.json();

        if (!data.lessons) {
            return;
        }

        const lessonImages = document.querySelectorAll(
            'img[src*="/filimomad/mad"]'
        );
        data.lessons.forEach(function (imagePath, index) {

            if (lessonImages[index]) {
                lessonImages[index].src = imagePath;
            }

        });

    } catch (error) {
        console.error("Filimo School Lessons Error:", error);
    }
}

getFilimoSchoolLessons();
async function getFilimoSchoolSkills() {
    try {
        const response = await apiFetch("filimoSchoolPage");

        if (!response.ok) {
            throw new Error("خطا در دریافت تصاویر مهارت‌ها");
        }

        const data = await response.json();

        if (!data.skills) {
            return;
        }

        const skillImages = Array.from(
            document.querySelectorAll('img[src*="filimomad/"]')
        ).filter(function (img) {
            return /\/m(1|2|3|4|5|6|21|22|23|24|25|26)\.jpg$/.test(
                img.getAttribute("src") || ""
            );
        });

        data.skills.forEach(function (item, index) {

            if (skillImages[index]) {
                skillImages[index].src = item.image;
            }

        });

    } catch (error) {
        console.error("Filimo School Skills Error:", error);
    }
}

getFilimoSchoolSkills();
async function getFilimoSchoolSkillsText() {
    try {
        const response = await apiFetch("filimoSchoolPage");

        if (!response.ok) {
            throw new Error("خطا در دریافت متن مهارت‌ها");
        }

        const data = await response.json();

        const skillsTitle = document.getElementById("skills-title");
        const skillsDescription = document.getElementById("skills-description");
        const alwaysTitle = document.getElementById("always-title");
        const alwaysDescription = document.getElementById("always-description");
        const androidTvButton = document.getElementById("android-tv-button");
        const androidButton = document.getElementById("android-button");
        const iosButton = document.getElementById("ios-button");

        if (skillsTitle && data.skillsTitle) {
            skillsTitle.textContent = data.skillsTitle;
        }

        if (skillsDescription && data.skillsDescription) {
            skillsDescription.textContent = data.skillsDescription;
        }

        if (alwaysTitle && data.alwaysTitle) {
            alwaysTitle.textContent = data.alwaysTitle;
        }

        if (alwaysDescription && data.alwaysDescription) {
            alwaysDescription.textContent = data.alwaysDescription;
        }

        if (androidTvButton && data.androidTvButton) {
            androidTvButton.childNodes[0].textContent = data.androidTvButton;
        }

        if (androidButton && data.androidButton) {
            androidButton.textContent = data.androidButton;
        }

        if (iosButton && data.iosButton) {
            iosButton.textContent = data.iosButton;
        }

    } catch (error) {
        console.error("Filimo School Skills Text Error:", error);
    }
}

getFilimoSchoolSkillsText();
async function getFilimoSchoolTestimonials() {
    try {
        const response = await apiFetch("filimoSchoolPage");

        if (!response.ok) {
            throw new Error("خطا در دریافت نظرات کاربران");
        }

        const data = await response.json();

        if (!data.testimonials) {
            return;
        }

        const title = document.getElementById("testimonials-title");
        const description = document.getElementById("testimonials-description");

        if (title && data.testimonials.title) {
            title.textContent = data.testimonials.title;
        }

        if (description && data.testimonials.description) {
            description.textContent = data.testimonials.description;
        }

        data.testimonials.items.forEach(function (item, index) {

            const name = document.getElementById(
                `testimonial-name-${index + 1}`
            );

            const text = document.getElementById(
                `testimonial-text-${index + 1}`
            );

            if (name) {
                name.textContent = item.name;
            }

            if (text) {
                text.textContent = item.text;
            }

        });

    } catch (error) {
        console.error("Filimo School Testimonials Error:", error);
    }
}

getFilimoSchoolTestimonials();
async function getFilimoSchoolEndSection() {
    try {
        const response = await apiFetch("filimoSchoolPage");

        if (!response.ok) {
            throw new Error("خطا در دریافت بخش پایانی");
        }

        const data = await response.json();

        if (!data.endSection) {
            return;
        }

        const image = document.getElementById("end-image");
        const title = document.getElementById("end-title");
        const description = document.getElementById("end-description");

        if (image && data.endSection.image) {
            image.src = data.endSection.image;
        }

        if (title && data.endSection.title) {
            title.textContent = data.endSection.title;
        }

        if (description && data.endSection.description) {
            description.textContent = data.endSection.description;
        }

    } catch (error) {
        console.error("Filimo School End Section Error:", error);
    }
}

getFilimoSchoolEndSection();
async function getFilimoSchoolFooter() {
    try {
        const response = await apiFetch("filimoSchoolPage");

        if (!response.ok) {
            throw new Error("خطا در دریافت فوتر فیلیمومدرسه");
        }

        const data = await response.json();

        if (!data.filimoSchoolFooter) {
            return;
        }

        const title = document.getElementById("footer-title");
        const button = document.getElementById("footer-button");

        if (title && data.filimoSchoolFooter.title) {
            title.textContent = data.filimoSchoolFooter.title;
        }

        if (button && data.filimoSchoolFooter.button) {
            button.childNodes[0].textContent =
                data.filimoSchoolFooter.button;
        }

    } catch (error) {
        console.error("Filimo School Footer Error:", error);
    }
}

getFilimoSchoolFooter();