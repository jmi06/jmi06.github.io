---
title: "Combined Optimal Route: Audience friendly route optimizations for SailGP"
author: "Jack Ibsen"
date: 2026-07-09
tags: ['sports', 'data-science', 'hackathon']
---

_This project won third place at the [13th DeepSense Ocean of Data Challenge](https://deepsense.ca/ocean-of-data-challenge/)_


In SailGP, each team takes a slightly different path in order to capitalize on the best wind conditions. Combined Optimal Route (COR) takes the path of every team, and tries to find the most optimal route between them.

If two cars are racing on a track, one on the inside, one on the outside, which car's path will be faster? COR takes this one step further, asking instead: is there a combination of both routes that is actually the fastest?

![GIF example of combining routes](cor/racecar.gif)

For this project, I was given sensor data collected at a frequency of 1Hz across all competing teams, and all races for two SailGP events.

Every second of a leg is represented as a node in a directed graph. Each node contains the boat's heading, coordinates, the current wind speed, wind direction, and time elapsed during the leg. Directed edges are then connected between every node at time \(t\) to every other node at time \(t+1\)

In order to determine how favourable the conditions are to travel between nodes, we apply a weight to our edges. This weight is known as our penalty, the higher the number, the less favourable and realistic the path becomes. The penalty formula is as follows.

\[Penalty = d(1000 + |h_{w} - h_{b}|)(cos(s))\]

Where:
- \(d\) is the distance between nodes.
- \(s\) is the speed of the wind.
- \(h_{w}\) is the heading of the wind.
- \(h_{b}\) is the heading of the boat.

Dijsktra's algorithm is then run on our network to find the route with the lowest combined penalty. This in turn, becomes our most optimal route.

![Examples of Combined Optimal Routes](cor/example_routes.jpg)

Combined Optimal Route is not a perfect solution. For starters, the teams do not all pass these points at the same time. What might have been ideal conditions when the first place team sailed through, may not be ideal by the time the last place team reaches that point. It also does not take into account the real physics of these boats. A catamaran is not able to instantaneously take a 90 degree turn. But Combined Optimal Route is not meant to be a perfect solution. It is meant to allow a television audience to compare their favourite team's decisions, and how they chose to traverse the course. It gives the viewer a quick glance at how efficient each team's route was, and what theoretically could have been the best possible route.
