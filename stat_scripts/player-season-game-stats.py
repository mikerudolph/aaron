import nflgame
import csv

aaron = nflgame.find('Aaron Rodgers')[0]

#years = [2010, 2011, 2012, 2013, 2014, 2015, 2016]
years = [2017]

for year in years:
    reg = nflgame.games(year, home="GB", away="GB", kind="REG")
    #post = nflgame.games(year, home="GB", away="GB", kind="POST")
    #games = reg + post
    games = reg

    filename = 'dist/csv/aaron_rodgers/game_stats/' + str(year) + '.csv'
    with open(filename, 'wb') as csvfile:
        writer = csv.writer(csvfile, delimiter=',')
        writer.writerow(['week', 'game_time', 'date_stamp', 'nice_score', 'win', 'lose', 'winner', 'loser', 'team_home', 'team_away', 'season_type', 'home', 'passer_rating', 'passing_att', 'passing_cmp', 'passing_ints', 'passing_tds', 'passing_twopta', 'twopta', 'twoptm', 'twoptmissed', 'passing_twoptm', 'passing_yds', 'rushing_att', 'rushing_lng', 'rushing_lngtd', 'rushing_tds', 'rushing_twopta', 'rushing_twoptm', 'rushing_yds', 'tds' ])

        for g in games:
            for schedule in g.schedule:
                week = g.schedule['week']
                year = g.schedule['year']
                month = g.schedule['month']
                day = g.schedule['day']
                time = g.schedule['time']
                season_type = g.schedule['season_type']
                date_stamp = str(month) + '/' + str(day) + '/' + str(year)
                break

            if g.players.name(aaron.gsis_name):
                stats = g.players.name(aaron.gsis_name)
                writer.writerow([
                    week,
                    time,
                    date_stamp,
                    g.nice_score(),
                    (g.winner == 'GB'),
                    (g.loser == 'GB'),
                    g.winner,
                    g.loser,
                    g.home,
                    g.away,
                    season_type,
                    stats.home,
                    stats.passer_rating(),
                    stats.passing_att,
                    stats.passing_cmp,
                    stats.passing_ints,
                    stats.passing_tds,
                    stats.passing_twopta,
                    stats.twopta,
                    stats.twoptm,
                    stats.twoptmissed,
                    stats.passing_twoptm,
                    stats.passing_yds,
                    stats.rushing_att,
                    stats.rushing_lng,
                    stats.rushing_lngtd,
                    stats.rushing_tds,
                    stats.rushing_twopta,
                    stats.rushing_twoptm,
                    stats.rushing_yds,
                    stats.tds
                ])
