---
title: "~/Projects"
layout: "single page"
---
<style>
	#project-container{
		margin-top: 30px;
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
	}
    p:has(em){
    	margin:0 !important;
    	
    }

    .project{
      display:flex;
	  flex-direction: column;
	  margin-bottom: 35px;
	  /* flex-basis: 42%; */
	  background: rgba(46, 52, 64,0.5);
	  border: 1px rgba(46, 52, 64,0.2);
	  /* border-radius: 13px; */
    }
    .project > *{
        text-align:center;
    }
    p em{
    	margin:0;
    }
    .project > p{
        margin: 10px;
    }

    .project > h3{
    	margin-bottom:0;
        margin:0;
    	padding:0;
    }

    .project img{
        display:none;
        margin:auto;
        width: 250px;
        height: auto;

    }

    



</style>


<div id='project-container'>

<section id="quantus-sports" class='project'>

### [QuantusSports](QuantusSports)

*Python, Flask, JavaScript*

![QuantusBasketball ratings page](/projects/quantussports-screenshot5.png)

Unique Sports Data Metrics

</section>
<section id="cor" class='project'>

### [Combined Optimal Route (COR)](/articles/COR)

*Python, Matplotlib*

![PlayerRankings Dataset](/projects/pvb-screenshot2.png)

SailGP Optimization Visualization

</section>

<section id="player-rankings" class='project'>

### [PlayerRankings](PlayerRankings)

*Python, Pandas*

![PlayerRankings Dataset](/projects/pvb-screenshot2.png)

Baseball Player Comparison Model

</section>



<section id="glyph" class='project'>

### [Meteo](Meteo)

*Python, Curses*

![Example of Glyph](/projects/meteo-screenshot1.png)

Canadian Weather TUI
</section>

<section id="player-rankings" class='project'>

### [Glyph](Glyph)

*Python*

![Example of Glyph](/projects/glyph-screenshot.png)

TeX-Like Markup Language

</section>


</div>