// AUTHORS: Vikas Parmar
// GITHUB: https://github.com/vikas-parmar

// Profile ----------------------------------------------------------------
const fullName = "Vikas Parmar";
const role = "Software Developer";
const internship = "Full Stack Intern at Bharat Intern";
const bio =
  "I'm passionate about coding and crafting web magic. I'm a React enthusiast, skilled in WordPress and Wix development.";

const techStack = {
  frontend: ["HTML", "CSS", "JavaScript"],
  frameworks: ["React.js", "Next.js"],
  styling: ["Material UI", "TailwindCSS", "SCSS"],
  backend: ["Node.js", "Express.js"],
  cms: ["WordPress"],
  designTools: ["Figma", "Canva", "Wix"],
  versionControl: ["Git", "GitHub"],
};

// Displaying information
console.log(`Hello World! I'm ${fullName}`);
console.log(`Role: ${role}`);
console.log(`Currently, I'm a ${internship}`);
console.log(`Bio: ${bio}`);
console.log("\nTech Stack:");

// Displaying tech stack
for (const category in techStack) {
  console.log(`${category}: ${techStack[category].join(", ")}`);
}