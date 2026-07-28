---
title: "~/Projects/PlayerRankings"
layout: "single page"
---

### [PlayerRankings](https://github.com/jmi06/PlayerRankings) | December 2025 - Present{.center}
*Python, Pandas*

<div class="image-row">

  ![Example of ratings](projects/pvb-screenshot2.png)
  ![File with at bats](projects/pvb-screenshot1.png)

</div>

 I created a Pitcher vs. Batter model to determine who is the best baseball player in MLB. It uses a similar formula to Quantus, except it treats every at-bat as it's own game, and the result of that at-bat determines how much the rating is affected by. For example, if the batter hits a home run, it will impact their rating more than if they draw a walk. Similarly for pitchers, if they strikeout a batter, it will impact their rating more than a routine out. It also takes into account the opponents rating, if an ace gives up a home run to a poor hitter, their rating will take a bigger hit and vice versa. The plan is to integrate this into QuantusSports.
