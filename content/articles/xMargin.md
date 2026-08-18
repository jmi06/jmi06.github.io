---
title: "xMargin: Expected Point Margin Model for Curling"
author: "Jack Ibsen"
date: 2026-08-18
tags: ['sports', 'data-science']
---


</section>
<section>

*Source code for this project is available on [GitHub](https://github.com/jmi06/xMargin)*



## Introduction

In curling, the traditional metrics that are used to determine a team’s performance include their hammer efficiency, ability to achieve and prevent steals, the number of big ends scored or given up, and shooting percentages [1]. On their own, when compared to the mean, these metrics can give a general overview of performance. What these metrics do not determine is whether the scoreboard and performance align. Consequently, spectators, coaches, and players are unable to compare a team's performance to the result they achieved.

A team dominant in every performance metric could find themselves in a tight game, whereas two opponents with identical shooting percentages could end up with a large point differential due to variability in ice conditions. This article introduces \(xMargin\), a model that predicts a curling team’s expected point margin by analyzing performance differentials between two competing teams after each end. Comparing a team’s \(xMargin\) to the actual point margin demonstrates the influence of variability on the game’s outcome and isolates a team’s performance from the result.

## Background

Soccer uses a metric known as xG (expected goals) to predict what the score should be based on the offensive performance of both the playing teams. xG uses historical data of similar shot attempts to predict how likely a shot is to result in a goal. If a player takes a shot from a scenario that resulted in a goal 60% of the time, their xG would be 0.6. The xG values of each shot are summed to determine the expected number of goals during a game. The xG metric is used to evaluate a team’s overall offensive performance, looking past the scoreline and taking note of opportunities created [2]. A very similar model has been used in ice hockey, to evaluate the same concept [3].

In curling, points are not scored on individual shots, rather after an end is played. Individual end performances could be analyzed, and the expected result of each end summed to find what the final score should be, similar to xG. Most performance metrics used in curling such as hammer efficiency and steal defense look at the game as a whole, thus can not be used to determine a team’s performance in an end. Curling does have one metric that changes after each shot is thrown, shot rating percentages. After each shot is thrown, it is given a rating between zero and four. A shot rated four indicates it was perfectly made, where a zero indicates a complete miss. By using the differential shot rating for each position during an end, along with a few other factors, a model could be built to predict the result based on historically similar ends.

Unlike soccer, where any team can score at any time, in curling only one team can score per end. Therefore it does not make sense to calculate the expected score for both teams each end. Rather, our model should track the same team for the entire game, and predict the point margin each end. Positive values indicate points scored, negative values indicate points given up, and zero represents a blank end.

This introduces \(xMargin\), an expected point margin model for curling. After an end is played, the resulting point margin is predicted using game information, as well as positional differentials in shot rating for that end only. These values can be summed over the course of the game to get the cumulative expected point margin for the target team.

## Methodology

An XGBoost gradient boosted decision tree model was trained to create xMargin. XGBoost was chosen as it works well with structured data, and is meant for determining important relationships between features. There were two main options for models that could be used, regression and classifier. We chose to use a regression model, as data for high scoring ends (\(\pm 3\)) are few and far between. A classifier model would have difficulty predicting large point differentials, as individual numbers (ie +3, +4) are treated as discrete classes with no relation to each other. A regression model is better suited for the task as the point differential is treated as a floating point number, preserving ordering and scale of numbers.

To train the model we analyzed game data for all Brier and Tournament of Hearts championships (the Canadian national men’s and women's championships, respectively) between 2023 and 2026. This range was selected because it encompasses the first national championships to implement the [no-tick-rule](https://www.curling.ca/blog/2023/10/04/no-tick-rule-added-in-2023-24/) [4], through to the most recent events as of writing this article. Men’s and Women’s data were kept separate in training.

Data was collected from Curling Canada’s event scoreboard pages (curling.ca/scoreboard) using the underlying curling.io API endpoints. 

| | Womens | Mens |
|---|---|---|
| **Events** | 4 | 4 |
| **Games** | 321 | 319 |
| **Ends** | 2911 | 2900 |
| **Blank %** | 9.4% | 14% |

Using information from each end, we engineered the following features. All differential metrics are calculated from the perspective of the target team, A.


| Feature | Formula | Description |
| :--- | :---: | :--- |
| \(\Delta Shot Rating_A(Position,End)\) | \(R_{A,Position} - R_{B,Position}\) | Difference in shot rating against the opponent at each position for a select end. |
| \(Δ Backend Zeroes_A\) | \(Zeros_{A,3} + Zeros_{A,4}) - (Zeros_{B,3} + Zeros_{B,4}\) | Differential number of total missed shots by the third and fourth. |
| \(Δ Cumulative Score\) | \(Score_A - Score_B\) | Cumulative point differential for the game at the start of the end. |
| \(EndsRemaining\) | \(ScheduledEnds-CurrentEnd\) | Number of scheduled ends remaining in the game. |
| \(Hammer_A\) | 1 if TeamA has hammer, else 0 | Whether or not Team A has the hammer in the end. |
| \(LSFE_A\) | 1 if TeamA had LSFE, else 0 | Whether or not TeamA began the game with hammer |
| \(Even End\) | \(End\mod{2}\) | Whether the current end number is even. |

These features were engineered as they represent some of the most crucial factors to scoring in curling, not only from a performance perspective, but in terms of strategy as well. The team with the hammer is much more likely to score in the end. Teams down by multiple points will take more risks, either scoring multiple, or giving up a large amount of points. If the game is tied and only one end remains, the end is more likely to be low scoring. Complete misses by backend players (thirds and fourths), are usually detrimental to an end, and can result in large point swings.

Each row in the dataset represents one end of curling. Using scikit-learn's train_test_split function, the data is split into two sets, a training set containing 75% of the ends, and testing set containing 25%. The training set is then used to train the XGBRegressor, with the below configuration.

```python
model = xgb.XGBRegressor(
    eval_metric='mae',
    objective="reg:absoluteerror",
    tree_method = "auto",
    n_estimators = 500,
    random_state = 1,
    early_stopping_rounds=50,
)
```

## Results

As stated earlier, data was split by gender. This means two models were trained, one for women's games and one for men's games.

### Importance
To analyze the importance of our features, and how they impact predictions, we used the SHAP (SHapley Additive exPlana-tions). Every end is represented by a point on the following beeswarm charts. Each point is coloured to represent the value of the feature in that end, with blue representing the lower values, blending to red high values. The SHAP score indicates the direction of impact on the predicted point differential. Positive SHAP values indicate the feature in that end pulled the predicted point margin higher (favouring Team A to score), whereas negative values pull the prediction lower (favouring Team A to concede points).

![SHAP beeswarm chart](mens_womens_beeswarm_shap.png)



These beeswarm charts confirm that the chosen features do have significant impact on scoring potential. Most notably, hammer, and the results achieved by backend players. 

### Error and Loss Functions

Both the men's and women's model had very similar accuracy. Both models achieved a Mean Absolute error of less than one.

| | Womens | Mens |
|---|---|---|
| **Mean Absolute Error** | 0.79 | 0.77 |
| **Median Absolute Error** | 0.76 | 0.64 |
| **Mean Squared Error** | 1.13 | 1.12 |
| **Root Mean Squared Error** | 1.06 | 1.06 |
| **R²** | 0.67 | 0.61 |


As demonstrated by the residual plot below, the majority of xMargin prediction residuals are between -0.5 and +1 (~70%).

![Mens and Womens residual chart](mens_womens_residual.png)

The plot also demonstrates the sparsity of data when we leave the range of \(xMargin \in [-2, +2]\). Only about twelve percent of men's and women's data falls outside of this range.

Measuring the efficacy of xMargin is difficult, as while it is a prediction model, prediction accuracy is not its sole purpose. Ends with large residuals do not mean the model did a poor job, rather that the team may have outperformed or underperformed the scoreboard. There is no concrete way to know what the score should actually be, thus the xMargin model functions as intended. The model does not necessarily get "better" by adding more data, it gains more understanding of previous ends, and this understanding is used to isolate a team's performance from result.

## Conclusion and Future Work
In its current form, the model treats every shot equally. A future version of the model could look at how important each shot is. If a team has a string of four poor shots, it's crucial for the skip to make their final shot perfectly to avoid a big end.

In the future more data from more events around the world could be included to improve predictions. Currently, only the Canadian national championships are included, but data from the Grand Slam of Curling and the World Championships could help reduce loss, especially in higher point margin ends.

The model could also be adapted for use in broadcasted curling games to provide more insight, and bite-sized analysis, much like how xG is used in soccer.

By isolating execution from scoreboard variance, \(xMargin\) provides coaches, analysts, and fans with a clearer view on true team performance in curling.


## References
[1] S. E. Erhan, F. Ağduman, and D. Bedir, “Exploring Predictors of Team Performance in Curling Championships: An Investigation of Factors Predicting Success,” CBÜ Beden Eğitimi ve Spor Bilimleri Dergisi, vol. 18, no. 2, pp. 845–853, Dec. 2023, doi: 10.33459/cbubesbd.1307573.

[2] J. Colman, “Expected goals: What is xG in football and how does it work?,” BBC Sport, Sept. 26, 2025. Accessed: Aug. 18, 2026. [Online]. Available: https://www.bbc.com/sport/football/articles/cgrqd18q0rgo

[3] B. Macdonald, “An Expected Goals Model for Evaluating NHL Teams and Players,” Jan. 2012.

[4] Curling Canada, “Curling Canada adopts No-Tick Rule for all events as of 2023-24,” Curling Canada. https://www.curling.ca/blog/2023/10/04/no-tick-rule-added-in-2023-24/ (accessed Aug. 18, 2026).