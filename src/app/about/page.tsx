import React from "react";
import facts from "@/content/about/facts.json";
import tools from "@/content/about/tools.json"

const AboutPage = () => {
  return (
    <div>
      <section>
        <h1>About</h1>
        <p>
          Hi, my name is Arne!<br />
        </p>
        <p>Here are some facts about me:</p>
        <ul>
          {facts.map((fact, idx) => (
            <li key={idx} className="list-disc ml-6 mt-0.5">{fact}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Education</h2>
        <p>Studying Applied Computer Science - Software Engineering at Howest Brugge.</p>
      </section>

      <section>
        <h2>Work</h2>
        <p>Since I&apos;m still studying, I have only worked student jobs in the summer vaction.</p>
        <p>
          My professional experience is a unique blend of customer service and administration. I&apos;ve spent six summers
          perfecting my skills as a professional ice cream scooper and waffle baker. Ove the past three years, I&apos;ve managed
          to combine this role with medical administration at my local hospital&apos;s orthopedics department. In 2023, I 
          also have worked as an accounting assistant for 6 weeks.    
        </p>
      </section>

      <section>
        <h2>My Setup</h2>
        <p>
          For the fellow devlopers and computer enthousiasts out there. I have 2 main systems. My laptop runs Windows and my
          desktop has a Windows and Arch Linux (btw) dual-boot. The only reason I still use windows is for some Adobe
          software and gaming. Currently I don&apos;t play any games that are not Linux-compatible but I want to have the option
          available.
        </p>
        <p>Here&apos;s a list of tools I use on a daily basis:</p>
        <ul>
          {tools.map((tool, idx) => (
            <li key={idx} className="list-disc ml-6 mt-0.5"><a href={tool.link}>{tool.name}</a></li>
          ))}
        </ul>
        <p>Don&apos;t hesitate to reach out, <a href="malto:arne@arnevercruysse.be" className="text-accent underline">send me an email!</a></p>
      </section>
    </div>
  );
};

export default AboutPage;
