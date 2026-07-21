---
title: "~/Projects"
layout: "single page"
---
<style>
h1{
	font-size:1.5em;
}
.image-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content:center;
}

.image-row> img{ max-width: 35%;}
p:has(em) {
    text-align:center;
}
</style>

### [QuantusSports](https://quantussports.vercel.app/) | May 2025 - Present {.center}
*Python, Flask, HTML, CSS, JavaScript, Vercel* 

<div class="image-row">
  <img src="/projects/quantussports-screenshot1.png" alt="QuantusBasketball ratings page">
  <img src="/projects/quantussports-screenshot2.png" alt="QuantusBaseball predictions page">
  <img src="/projects/quantussports-screenshot3.png" alt="QuantusHockey team page">
</div>

 QuantusSports is a sports analytics and statistics project I started back in May 2025. It began as an Elo system for MLB baseball games, where point differentials were taken into account. Therefore a blowout win would reward a team more than a close game. I have since ported it over to hockey and basketball as well, branding it under one unified name, Quantus. Each sport has it's own BlueSky account where live updates are posted after each game. Each sport also features a predictions tab, where team ratings are used to make game predictions. As of May 2026, the model is nearly 65% accurate at predicting NBA games. 

---

### [PlayerRankings](https://github.com/jmi06/PlayerRankings) | December 2025 - Present{.center}
*Python, Pandas*

<div class="image-row">
  <img src="/projects/pvb-screenshot2.png" style='max-width:45%;' alt="Example of ratings">
  <img src="/projects/pvb-screenshot1.png" style='max-width:45%;' alt="File with at bats">
</div>

 I created a Pitcher vs. Batter model to determine who is the best baseball player in MLB. It uses a similar formula to Quantus, except it treats every at-bat as it's own game, and the result of that at-bat determines how much the rating is affected by. For example, if the batter hits a home run, it will impact their rating more than if they draw a walk. Similarly for pitchers, if they strikeout a batter, it will impact their rating more than a routine out. It also takes into account the opponents rating, if an ace gives up a home run to a poor hitter, their rating will take a bigger hit and vice versa. The plan is to integrate this into QuantusSports.

---

### [Glyph](https://github.com/jmi06/Glyph) | January 2026{.center}
*Python, HTML, CSS* 

<img src="/projects/glyph-screenshot.png" alt="Glyph example">

Glyph is a lightweight, TeX inspired markup language written in Python. It uses a syntax similar to TeX with it's heavy use of backward slashes and curly braces. The Python utilty converts the .glyph files to HTML. 

---

### [Meteo](https://github.com/jmi06/Meteo) | December 2025{.center}
*Python, Curses, Requests*

<div class="image-row">
  <img src="/projects/meteo-screenshot2.png" style='max-width:45%;' alt="Meteo current conditions">
  <img src="/projects/meteo-screenshot1.png" style='max-width:45%;' alt="Meteo warning example">
</div>

Meteo is a TUI weather client for Canadian Weather. It fetches weather data from Environment Canada's hidden API. It features current conditions, hourly forecasts, daily forecasts, and weather warnings/alerts. 






