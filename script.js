let intervalId;
let A = 1, B = 1;

function renderDonut() {
    const screen = document.getElementById("screen");
    let x = 1760;
    let output = [];
    let zBuffer = [];

    const sin = Math.sin, cos = Math.cos;
    A += 0.07; B += 0.03;
    const cA = cos(A), sA = sin(A);
    const cB = cos(B), sB = sin(B);

    for (let k = 0; k < x; k++) {
        output[k] = k % 80 === 79 ? "\n" : " ";
        zBuffer[k] = 0;
    }

    for (let j = 0; j < 6.28; j += 0.07) {
        const ct = cos(j), st = sin(j);
        for (let i = 0; i < 6.28; i += 0.02) {
            const sp = sin(i), cp = cos(i);
            const h = ct + 2;
            const D = 1 / (sp * h * sA + st * cA + 5);
            const t = sp * h * cA - st * sA;

            const x = 0 | (40 + 30 * D * (cp * h * cB - t * sB));
            const y = 0 | (12 + 15 * D * (cp * h * sB + t * cB));
            const o = x + 80 * y;
            const N = 0 | (8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB));

            if (y < 22 && y >= 0 && x >= 0 && x < 80 && D > zBuffer[o]) {
                zBuffer[o] = D;
                output[o] = ".,-~:;=!*#$@"[N > 0 ? N : 0];
            }
        }
    }

    screen.innerHTML = output.join("");
}

function startDonut() {
    if (!intervalId) {  // Only start if not already running
        intervalId = setInterval(renderDonut, 50);
        document.getElementById("screen").style.display = "block";
    }
}

function stopDonut() {
    clearInterval(intervalId);
    intervalId = null;  // Reset the interval ID
    document.getElementById("screen").style.display = "none";
}

let scene, camera, renderer, torus;
let animationId;  // Keep track of the animation frame request

function initThreeJS() {
    if (renderer) return; // Prevent re-initialization

    const container = document.getElementById("threejs-container");

    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1c1c1c);

    // Camera
    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 10);

    // Torus
    const geometry = new THREE.TorusGeometry(2, 1, 16, 120);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });

    torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    // Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Responsiveness
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

function animate() {
    animationId = requestAnimationFrame(animate);
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;
    renderer.render(scene, camera);
}

function showContent(tabNumber) {
    const screen = document.getElementById('screen');
    const description = document.getElementById('description');
    const threejsContainer = document.getElementById('threejs-container');
    const tabs = document.getElementsByClassName('tab');

    // Hide all sections first
    screen.style.display = 'none';
    threejsContainer.style.display = 'none';

    // Deactivate all tabs
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }
    tabs[tabNumber - 1].classList.add('active');

    // Switch content based on the selected tab
    switch (tabNumber) {
        case 1:
            stopDonut(); // Clear any running interval first
            cancelAnimationFrame(animationId);  // Stop the animation loop
            animationId = null;  // Reset the animation ID to allow restarting later
            description.innerHTML = `
                <p>Professional Summary</p>
                <p>Innovative Computer Engineer specializing in AI-driven backend development, algorithm optimization, and database management. Currently pursuing a Bachelor’s in Computer Engineering.</p>
                <p>Actively learning both front-end and back-end technologies to gain a comprehensive understanding of the entire development process. I enjoy solving algorithmic problems on LeetCode.</p>
                <p>Core Skills</p>
                <ul>
                    <li>Programming Languages: Python, JavaScript, C++, Java</li>
                    <li>Frameworks: ROS, OpenCV, YOLO, QT / Django, Selenium, Next.js, Express.js, Firebase, BeautifulSoup</li>
                    <li>Tools: Git, MATLAB</li>
                    <li>Databases: MySQL, PostgreSQL</li>
                </ul>
                <p>Volunteer Computer Vision Developer – AYA (February 2023)</p>
                <ul>
                    <li>Utilize deep learning, computer vision algorithms to identify collapsed buildings from space and satellite imagery.</li>
                    <li>Utilized Entropy Coding and Remote Sensing for pre-processing to optimize the processing of image analysis.</li>
                    <li>Contributed to image labelling studies.</li>
                </ul>
                <p>Volunteer Educator - ECEV</p>
                <ul>
                    <li>Children aged 5-15; I gave FLL robotics training and awareness study, chess education for students over 100.</li>
                </ul>
                <p>Key Projects</p>
                <ul>
                    <li>SearchStore: Web Scraping Application</li>
                    <ul>
                        <li>Technologies: JavaScript, Fetch API</li>
                        <li>Built a web application for scraping and displaying data from various online stores using JavaScript.</li>
                        <li>Implemented efficient data retrieval techniques with the Fetch API for real-time data display.</li>
                    </ul>
                    <li>AstroReis: AI-Powered Astrology Application</li>
                    <ul>
                        <li>Technologies: FastAPI, GenAI-APIs</li>
                        <li>Developed a backend for AI-driven horoscope predictions.</li>
                    </ul>
                </ul>
                <p>Education</p>
                <ul>
                    <li>İzmir Katip Çelebi University</li>
                    <ul>
                        <li>B.Sc. in Computer Science and Engineering, Expected Graduation: June 2028</li>
                    </ul>
                    <li>Cihat Kora Anatolian High School</li>
                    <ul>
                        <li>Science and Math, Graduated: June 2024</li>
                    </ul>
                </ul>
                <p>Certifications & Honors</p>
                <ul>
                    <li>Python Automation and Testing | National Association of State Boards of Accountancy (NASBA)</li>
                    <li>Python Data Analysis | LinkedIn</li>
                    <li>Advanced Prompt Engineering Techniques | LinkedIn</li>
                    <li>Artificial Intelligence and Business Strategy | Project Management Institute (PMI)</li>
                    <li>Critical Thinking for Better Judgment and Decision-Making | Project Management Institute (PMI)</li>
                </ul>
                <p>Languages</p>
                <ul>
                    <li>Turkish: Native language</li>
                    <li>English: C1 level – MEB(ministry of public education) Certified C1 – Izmir Katip Celebi University | Celebi Proficiency Test (scored 89%)</li>
                    <li>German: A2 level</li>
                </ul>
            `;
            break;
        case 2:
            stopDonut(); // Clear any running interval first
            startDonut();
            description.innerHTML = `
                <p>Experience</p>
                <ul>
                    <li>GDG On Campus IKCU – Core Team Member (October 2024 – Present)</li>
                    <li>ECO-ROVER – Robotics Developer, Programming Team Member (October 2024 – Present)</li>
                    <li>Beast Wear – Co-Founder, CTO (March 2024 - Present)
                        <ul>
                            <li>Developed a scalable e-commerce platform using Next.js and Firebase.</li>
                            <li>Integrated shopier and shipping APIs to streamline payment and logistics.</li>
                        </ul>
                    </li>
                    <li>Brif Studio – Co-Founder, Backend-Prompt Engineer (March 2023 - August 2023)
                        <ul>
                            <li>Engineered AI-integrated backend systems to automate presentation generation.</li>
                            <li>Optimized database management systems, reducing data retrieval times by 40%.</li>
                        </ul>
                    </li>
                    <li>TradeMonex – Backend Developer (August 2022 – February 2023)
                        <ul>
                            <li>Automated data processing workflows, reducing manual input requirements by 30%.</li>
                        </ul>
                    </li>
                    <li>İzelman Robotics – Head of Programming (June 2022 – January 2024)
                        <ul>
                            <li>Led development of autonomous and manual control systems for robotics, utilizing AI and sensor fusion.</li>
                            <li>Designed and implemented control algorithms (e.g., PID) to enhance robotic performance.</li>
                            <li>Facilitated hardware-software integration in complex robotics systems.</li>
                            <li>Provided mentorship, contributing to improved team outcomes and technical skills.</li>
                        </ul>
                    </li>
                    <li>Gökbörü ROV Team – Technical Lead (October 2022 - April 2023)
                        <ul>
                            <li>Developed ROS-Mavlink protocols for real-time underwater operations.</li>
                            <li>Implemented AI-driven image processing algorithms for sonar data, improving detection accuracy by 10%.</li>
                            <li>Designed a proprietary sonar system with 360-degree scanning capabilities, enhancing environmental awareness.</li>
                            <li>Utilized algorithms (Sea-Thru, YOLO) for underwater image correction and perception.</li>
                        </ul>
                    </li>
                </ul>
            `;
            screen.style.display = 'block';
            break;
        case 3:
            stopDonut();
            description.innerHTML = `<p>Tab 2: 3D Torus using Three.js will be shown here.</p>`;
            threejsContainer.style.display = 'block';
            initThreeJS();
            if (!animationId) {
                animate();  // Start the animation only if it's not already running
            }
            break;
    }
}

// Start with the first tab
showContent(1);
            break;
    }
}

// Start with the first tab
showContent(1);
