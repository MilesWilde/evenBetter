#! /usr/bin/env ruby

require 'nokogiri'
require 'open-uri'
require 'json'


# puts "### Getting the RAW HTML of the page"
urlGameVersion = "NBA"
urlGameDate = "20171018"
html = open("http://scores.nbcsports.msnbc.com/ticker/data/gamesMSNBC.js.asp?sport=#{urlGameVersion}&period=#{urlGameDate}").read


parsedVar = JSON.parse(html)
gameDate = parsedVar['period']
gameType = parsedVar['sport']
# puts gameDate

indivGame = parsedVar['games'][0]
indivGame.gsub!('\"', '"')
doc = Nokogiri::XML(indivGame)

#Parsing the escaped XML
homeTeamVar = doc.at_xpath('//home-team')
awayTeamVar = doc.at_xpath('//visiting-team')
gameVariables = doc.at_xpath('//gamestate')

# #Game Data
# deliverToClient["gameType"] = gameType
# deliverToClient["gameDate"] = gameDate
# deliverToClient["gameTime"] = gameVariables.attr('gametime')


# # puts "HOME TEAM"
# deliverToClient["homeTeamName"] = homeTeamVar.attr('display_name')
# deliverToClient["homeNickName"] = homeTeamVar.attr('nickname')
# deliverToClient["homeScore"] = homeTeamVar.attr('score')
# deliverToClient["homeAlias"] = homeTeamVar.attr('alias')


# # puts "AWAY TEAM"
# deliverToClient["awayTeamName"] = awayTeamVar.attr('display_name')
# deliverToClient["awayNickName"] = awayTeamVar.attr('nickname')
# deliverToClient["awayScore"] = awayTeamVar.attr('score')
# deliverToClient["awayAlias"] = awayTeamVar.attr('alias')

deliverToClient = {
    gameType: gameType,
    gameDate: gameDate,
    gameTime: gameVariables.attr('gametime'),

    homeTeamName: homeTeamVar.attr('display_name'),
    homeNickName: homeTeamVar.attr('nickname'),
    homeScore: homeTeamVar.attr('score'),
    homeAlias: homeTeamVar.attr('alias'),

    awayTeamName:awayTeamVar.attr('display_name'),
    awayNickName:awayTeamVar.attr('nickname'),
    awayScore:awayTeamVar.attr('score'),
    awayAlias:awayTeamVar.attr('alias')
}

puts deliverToClient[:homeScore]
puts deliverToClient[:awayScore]

# Deciding Winner and Loser
if deliverToClient[:homeScore].to_i > deliverToClient[:awayScore].to_i
    deliverToClient[:gameWinner] = deliverToClient[:homeTeamName] + " " + deliverToClient[:homeNickName]
elsif deliverToClient[:homeScore].to_i === deliverToClient[:awayScore].to_i
    deliverToClient[:gameWinner] = "Tie game"
else
    deliverToClient[:gameWinner] = deliverToClient[:awayTeamName] + " " + deliverToClient[:awayNickName]
end

#JSON VERSION
deliverToClientJson = JSON.pretty_generate(deliverToClient)
puts deliverToClientJson


