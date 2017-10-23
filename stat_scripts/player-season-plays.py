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

    filename = 'dist/csv/aaron_rodgers/season_plays/' + str(year) + '.csv'
    with open(filename, 'wb') as csvfile:
        writer = csv.writer(csvfile, delimiter=',')
        writer.writerow(['season', 'week', 'game_time', 'date_stamp', 'desc', 'down', 'drive', 'first_down', 'home', 'note', 'passing_att', 'passing_cmp', 'passing_cmp_air_yds', 'passing_first_down', 'passing_tds', 'passing_yds', 'players', 'playid', 'receiving_rec', 'receiving_tar', 'receiving_tds', 'receiving_yac_yds', 'receiving_yds', 'team', 'time', 'touchdown', 'yardline', 'yards_togo'])

        for g in games:
            for schedule in g.schedule:
                week = g.schedule['week']
                year = g.schedule['year']
                month = g.schedule['month']
                day = g.schedule['day']
                time = g.schedule['time']
                date_stamp = str(month) + '/' + str(day) + '/' + str(year)
                break

            for i, drive in enumerate(g.drives):
                for play in drive.plays:
                    if play.has_player(aaron.player_id):
                        writer.writerow([
                            year,
                            week,
                            time,
                            date_stamp,
                            play.desc,
                            play.down,
                            i,
                            play.first_down,
                            play.home,
                            play.note,
                            play.passing_att,
                            play.passing_cmp,
                            play.passing_cmp_air_yds,
                            play.passing_first_down,
                            play.passing_tds,
                            play.passing_yds,
                            play.players,
                            play.playid,
                            play.receiving_rec,
                            play.receiving_tar,
                            play.receiving_tds,
                            play.receiving_yac_yds,
                            play.receiving_yds,
                            play.team,
                            play.time,
                            play.touchdown,
                            play.yardline,
                            play.yards_togo
                        ])
