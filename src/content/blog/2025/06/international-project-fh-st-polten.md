---
title: "International Project at FH St. Pölten & YTIC"
date: 2025-06-06
thumbnail: "st-polten-howest-group"
excerpt: "A week-long Erasmus+ Blended Intensive Program in Austria focused on training AWS DeepRacers and presenting a software architecture talk at the Youth Talents International Conference."
tags: ["erasmus+", "aws-deepracer", "reinforcement-learning", "ytic", "austria"]
---

Seven fellow students, two lecturers, and I participated in an Erasmus+ Blended Intensive Program (BIP) at USTP – University of Applied Sciences St. Pölten in Austria. The program began with three online classes in the evenings during the weeks leading up to the trip, followed by a physical week in Austria packed with technical learning, team challenges, and memorable cultural experiences.

<app-image name="st-polten-howest-group" alt="Howest students and lecturers at the FH St. Pölten sign" caption="Our Howest delegation at the FH St. Pölten campus sign."></app-image>

---

## The Journey to Austria

I traveled the entire way from Belgium to St. Pölten by train. My route started in Bruges, heading to Brussel-Midi, where I boarded a Deutsche Bahn ICE train to Frankfurt am Main. From there, I caught another ICE heading towards Vienna, getting off at St. Pölten. I love train travel, which gave me plenty of time to enjoy the changing landscapes, play some games on my Nintendo DS, and study for an upcoming exam. 

The return journey, however, came with a little surprise. I hadn't realized when booking that the trip back would take about six hours longer than the way there. I only noticed mid-week that I would arrive in Frankfurt at 23:30 with my connection departing at 6:00 the next morning. Fortunately, I managed to book a quick hostel bed in Frankfurt for a few hours of safe sleep before catching the morning train home!

---

## Machine Learning with AWS DeepRacer

The core of our week was dedicated to reinforcement learning and autonomous driving. Working in international teams, we were tasked with training a model to make an **AWS DeepRacer** (a 1/18th scale model car equipped with a camera) navigate a track autonomously. 

<app-image name="st-polten-deepracer" alt="Howest students holding an AWS DeepRacer car" caption="The Howest students posing with the AWS DeepRacer car."></app-image>

To train our model, we took a hands-on approach: we first drove the car manually around the track using a controller to collect driving data. With this dataset, we trained the model to clone our driving behavior. Our car performed quite well during the final competition, where every team tried to set the fastest lap on the physical track. 

Beyond the competition itself, the vibe within our international team was fantastic. We got to know each other during lunches, and on one particularly hot afternoon, a group of us headed to the nearby supermarket to buy ice cream for the entire team.

<app-image name="st-polten-project-group" alt="Our international team at the DeepRacer competition" caption="My international team during the AWS DeepRacer project."></app-image>

---

## Exploring Vienna and St. Pölten

Alongside the project, our schedule included planned trips during the week to experience Austrian culture and history. One of these excursions took us to Vienna, which left a huge impression on me. As a city of music, seeing the statues of famous composers, the beautiful green parks, and the historic buildings where these legendary composers once lived was wonderful. 

While in Vienna we got the opportunity to go exploring the city on our own one afternoon. We managed to find some of the best ice cream I've ever eaten, and when a sudden downpour started, we sought shelter in the grand entrance hall of the famous **Musikverein**, the building where the Wiener Philharmoniker performs their legendary New Year's Concert every year. Standing inside that historic hall was amazing, sadly we couldn't visit the Golden Hall because of the limited time we had.

<app-image name="vienna-palace" alt="A palace and its gardens in Vienna" caption="A view of one of Vienna's beautiful palaces and its gardens."></app-image>

Another trip during the week was a guided tour of St. Pölten. Led by a local guide, we walked through the city and visited the government seat of Lower Austria. It was really interesting to learn about the country's political structure, and we even got to sit in the actual seats where the members of parliament normally debate.

---

## Presenting at YTIC

The program concluded with the two-day **YTIC (Youth Talents International Conference)**. The conference featured interesting talks from students and researchers across different European universities. 

I had the opportunity to present there myself with a talk titled **"Build & Deploy - About Microservices and IaC"**. I spoke about **HowestPrime**, a project we built during our fourth semester at Howest. The architecture consists of two microservices (one built in .NET with a PostgreSQL database, and one built in Deno/TypeScript with a MongoDB database), a backoffice in Blazor, and a frontend container in Vue. The entire infrastructure was provisioned on Azure using Terraform and deployed via GitHub Actions workflows.

<app-image name="st-polten-ytic-presentation-1" alt="Arne presenting at YTIC" caption="Presenting my talk 'Build & Deploy - About Microservices and IaC' at the YTIC."></app-image>

Since the majority of presentations at the conference focused on machine learning, it was exciting to stand out by delivering a talk centered purely on software architecture and engineering. The main takeaway of my talk was that developers should make informed architectural choices: no structure is perfect, and our goal is always to find the "least-worst" fit for the scale and future of a project. I also hoped to inspire the audience to look into the technologies and concepts I mentioned, which I am very passionate about.

As a speaker, I was also invited to the evening speakers' reception. It was a great opportunity to network, share ideas, and connect with other presenters over drinks and snacks.

<app-image name="st-polten-ytic-presentation-2" alt="YTIC auditorium during presentation" caption="A view of the auditorium and audience during my presentation."></app-image>
