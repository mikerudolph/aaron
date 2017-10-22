import nflgame
import csv

def processSeason (games, playerID):
    playerStats = list(nflgame.combine(games).filter(playerid=playerID))
    print playerStats[0].passing_yds
    return;

aaron = nflgame.find('Aaron Rodgers')[0]

years = [2010, 2011, 2012, 2013, 2014, 2015, 2016]
#years = [2017]

for year in years:
    filename = 'csv/aaron_rodgers/season_totals/' + str(year) + '.csv'
    with open(filename, 'wb') as csvfile:
        writer = csv.writer(csvfile, delimiter=',')
        writer.writerow(['season_type', 'passer_rating', 'passing_att', 'passing_cmp', 'passing_ints', 'passing_tds', 'passing_twopta', 'twopta', 'twoptm', 'twoptmissed', 'passing_twoptm', 'passing_yds', 'rushing_att', 'rushing_lng', 'rushing_lngtd', 'rushing_tds', 'rushing_twopta', 'rushing_twoptm', 'rushing_yds', 'tds' ])

        regGames = nflgame.games(year, home="GB", away="GB", kind="REG")
        regStats = list(nflgame.combine(regGames).filter(playerid=aaron.playerid))[0]
        writer.writerow([
            'REG',
            regStats.passer_rating(),
            regStats.passing_att,
            regStats.passing_cmp,
            regStats.passing_ints,
            regStats.passing_tds,
            regStats.passing_twopta,
            regStats.twopta,
            regStats.twoptm,
            regStats.twoptmissed,
            regStats.passing_twoptm,
            regStats.passing_yds,
            regStats.rushing_att,
            regStats.rushing_lng,
            regStats.rushing_lngtd,
            regStats.rushing_tds,
            regStats.rushing_twopta,
            regStats.rushing_twoptm,
            regStats.rushing_yds,
            regStats.tds
        ])

        postGames = nflgame.games(year, home="GB", away="GB", kind="POST")
        postStats = list(nflgame.combine(postGames).filter(playerid=aaron.playerid))[0]
        writer.writerow([
            'POST',
            postStats.passer_rating(),
            postStats.passing_att,
            postStats.passing_cmp,
            postStats.passing_ints,
            postStats.passing_tds,
            postStats.passing_twopta,
            postStats.twopta,
            postStats.twoptm,
            postStats.twoptmissed,
            postStats.passing_twoptm,
            postStats.passing_yds,
            postStats.rushing_att,
            postStats.rushing_lng,
            postStats.rushing_lngtd,
            postStats.rushing_tds,
            postStats.rushing_twopta,
            postStats.rushing_twoptm,
            postStats.rushing_yds,
            postStats.tds
        ])
