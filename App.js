import AsyncStorage from '@react-native-async-storage/async-storage';

import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Linking,
  Share,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';

import * as Haptics from 'expo-haptics';

import { useEffect } from 'react';

let suburbRestaurants = {};

const defaultRestaurants = {
  'Victoria Park': [
    {
      name: 'Meet & Bun',
      map: 'https://maps.google.com/?q=Meet+%26+Bun+889+Albany+Hwy+East+Victoria+Park',
    },
    {
      name: 'Katzu Katzu',
      map: 'https://maps.google.com/?q=Katzu+Katzu+861+Albany+Highway+East+Victoria+Park',
    },
    {
      name: 'Qin’s Lanzhou Beef Noodle',
      map: 'https://maps.google.com/?q=Qin’s+Lanzhou+Beef+Noodle+873+Albany+Hwy+East+Victoria+Park',
    },
    {
      name: 'Funky Momo',
      map: 'https://maps.google.com/?q=Funky+Momo+604+Albany+Hwy+Victoria+Park',
    },
    {
      name: 'Izakaya Tori',
      map: 'https://maps.google.com/?q=Izakaya+Tori+610+Albany+Highway+Victoria+Park',
    },
    {
      name: 'Kuza',
      map: 'https://maps.google.com/?q=Kuza+393+Albany+Hwy+Victoria+Park',
    },
    {
      name: 'Duncan Street Store',
      map: 'https://maps.google.com/?q=Duncan+Street+Store+41+Duncan+St+Victoria+Park',
    },
    {
      name: 'Katen',
      map: 'https://maps.google.com/?q=Katen+871+Albany+Hwy+East+Victoria+Park',
    },
    {
      name: 'Dragon Hot Pot',
      map: 'https://maps.google.com/?q=Dragon+Hot+Pot+877+Albany+Hwy+East+Victoria+Park',
    },
    {
      name: 'Kanpai Yakiniku',
      map: 'https://maps.google.com/?q=Kanpai+Yakiniku+280+Albany+Hwy+Victoria+Park',
    },
    {
      name: 'Bentori',
      map: 'https://maps.google.com/?q=Bentori+257A+Albany+Hwy+Victoria+Park',
    },
    {
      name: 'RoyAl’s',
      map: 'https://maps.google.com/?q=RoyAl’s+834+Albany+Hwy+East+Victoria+Park',
    },
    {
      name: 'Neho Asian Tapas',
      map: 'https://maps.google.com/?q=Neho+Asian+Tapas+249+Albany+Hwy+Victoria+Park',
    },
    {
      name: 'The Prophet',
      map: 'https://maps.google.com/?q=The+Prophet+907A+Albany+Hwy+East+Victoria+Park',
    },
    {
      name: 'Dapur Van Java',
      map: 'https://maps.google.com/?q=Dapur+Van+Java+1+Leonard+St+Victoria+Park',
    },
    {
      name: 'Boston Brewing Co',
      map: 'https://maps.google.com/?q=Boston+Brewing+Co+660+Albany+Hwy+Victoria+Park',
    },
    {
      name: 'Palace Arcade',
      map: 'https://maps.google.com/?q=Palace+Arcade+774+Albany+Hwy+East+Victoria+Park',
    },
    {
      name: 'Ria Ayam Penyet',
      map: 'https://maps.google.com/?q=Ria+Ayam+Penyet+417+Albany+Hwy+Victoria+Park',
    },
    {
      name: 'Hakata Gensuke',
      map: 'https://maps.google.com/?q=Hakata+Gensuke+850+Albany+Hwy+East+Victoria+Park',
    },
    {
      name: 'Balmoral Hotel',
      map: 'https://maps.google.com/?q=Balmoral+Hotel+901+Albany+Hwy+Victoria+Park',
    },
    {
      name: 'Good Fortune Roast Duck House',
      map: 'https://maps.google.com/?q=Good+Fortune+Roast+Duck+House+884+Albany+Hwy+East+Victoria+Park',
    },
    {
      name: 'Little Ying Thai',
      map: 'https://maps.google.com/?q=Little+Ying+Thai+895+Albany+Hwy+East+Victoria+Park',
    },
    {
      name: 'Cosy Del’s',
      map: 'https://maps.google.com/?q=Cosy+Del’s+13+Lathlain+Place+Lathlain',
    },
    {
      name: 'Decanter',
      map: 'https://maps.google.com/?q=Decanter+279+Albany+Hwy+Victoria+Park',
    },
    {
      name: 'Vic Park Hotel',
      map: 'https://maps.google.com/?q=Vic+Park+Hotel+605+Albany+Hwy+Victoria+Park',
    },
    {
      name: 'Frank’s Texas Smokehouse',
      map: 'https://maps.google.com/?q=Frank’s+Texas+Smokehouse+767+Albany+Hwy+East+Victoria+Park',
    },
    {
      name: "Bravo's Restaurant",
      map: "https://maps.google.com/?q=Bravo's+Restaurant+East+Victoria+Park",
    },
    {
      name: "Pancho's Mexican Villa",
      map: "https://maps.google.com/?q=Pancho's+Mexican+Villa+East+Victoria+Park",
    },
    {
      name: 'Totally Thai',
      map: 'https://maps.google.com/?q=Totally+Thai+Carlisle',
    },
    {
      name: 'King Hot Pot',
      map: 'https://maps.google.com/?q=King+Hot+Pot+East+Victoria+Park',
    },
    {
      name: 'Sage Cafe',
      map: 'https://maps.google.com/?q=Sage+Cafe+Victoria+Park',
    },
    {
      name: 'Social Manna',
      map: 'https://maps.google.com/?q=Social+Manna+Victoria+Park',
    },
    {
      name: 'Seoul Buffet',
      map: 'https://maps.google.com/?q=Seoul+Buffet+Victoria+Park',
    },
    {
      name: 'Somewhere in the Park',
      map: 'https://maps.google.com/?q=Somewhere+in+the+Park+Victoria+Park',
    },
    {
      name: "Catalano's Cafe",
      map: "https://maps.google.com/?q=Catalano's+Cafe+Victoria+Park",
    },
    {
      name: 'Broken Hill Hotel',
      map: 'https://maps.google.com/?q=Broken+Hill+Hotel+Victoria+Park',
    },
    {
      name: 'Silk Road Uyghur Cuisine',
      map: 'https://maps.google.com/?q=Silk+Road+Uyghur+Cuisine+Victoria+Park',
    },
    {
      name: 'Pachi Pachi',
      map: 'https://maps.google.com/?q=Pachi+Pachi+Victoria+Park',
    },
    {
      name: 'Harvest Espresso',
      map: 'https://maps.google.com/?q=Harvest+Espresso+Victoria+Park',
    },
    {
      name: "Brando's Pizzeria",
      map: "https://maps.google.com/?q=Brando's+Pizzeria+Victoria+Park",
    },
    {
      name: 'Makan2 Cafe',
      map: 'https://maps.google.com/?q=Makan2+Cafe+Victoria+Park',
    },
    {
      name: 'MOM Dumpling House',
      map: 'https://maps.google.com/?q=MOM+Dumpling+House+Victoria+Park',
    },
    {
      name: 'The Sarapan',
      map: 'https://maps.google.com/?q=The+Sarapan+Victoria+Park',
    },
    {
      name: 'Mei’s Noodles',
      map: 'https://maps.google.com/?q=Mei’s+Noodles+Victoria+Park',
    },
  ],
  Leederville: [
    { name: 'Pinchos', map: 'https://maps.google.com/?q=Pinchos+Leederville' },
    { name: 'Duende', map: 'https://maps.google.com/?q=Duende+Leederville' },
    {
      name: 'Pappagallo',
      map: 'https://maps.google.com/?q=Pappagallo+Leederville',
    },
    { name: 'Will St', map: 'https://maps.google.com/?q=Will+St+Leederville' },
    { name: 'Servo', map: 'https://maps.google.com/?q=Servo+Leederville' },
    {
      name: 'Yalla Bala',
      map: 'https://maps.google.com/?q=Yalla+Bala+Leederville',
    },
    {
      name: 'Lima Cantina',
      map: 'https://maps.google.com/?q=Lima+Cantina+Leederville',
    },
    { name: "Daph's", map: "https://maps.google.com/?q=Daph's+Leederville" },
    {
      name: "Powell's Fromagerie",
      map: "https://maps.google.com/?q=Powell's+Fromagerie+Leederville",
    },
    { name: 'Tora', map: 'https://maps.google.com/?q=Tora+Leederville' },
    {
      name: 'Bunn Mee',
      map: 'https://maps.google.com/?q=Bunn+Mee+Leederville',
    },
    {
      name: 'Phat Lon',
      map: 'https://maps.google.com/?q=Phat+Lon+Leederville',
    },
    {
      name: 'Kitsch Bar Asia',
      map: 'https://maps.google.com/?q=Kitsch+Bar+Asia+Leederville',
    },
    {
      name: 'The Garden',
      map: 'https://maps.google.com/?q=The+Garden+Leederville',
    },
    {
      name: 'Mon Japanese Bistro',
      map: 'https://maps.google.com/?q=Mon+Japanese+Bistro+Leederville',
    },
    {
      name: "Fibber McGee's",
      map: "https://maps.google.com/?q=Fibber+McGee's+Leederville",
    },
    { name: 'Romulus', map: 'https://maps.google.com/?q=Romulus+Leederville' },
    { name: 'Naber', map: 'https://maps.google.com/?q=Naber+Leederville' },
    {
      name: 'Cranked Coffee',
      map: 'https://maps.google.com/?q=Cranked+Coffee+Leederville',
    },
    {
      name: 'Tagine Tapas & Grill',
      map: 'https://maps.google.com/?q=Tagine+Tapas+and+Grill+Leederville',
    },
    {
      name: 'Amani Bar and Kitchen',
      map: 'https://maps.google.com/?q=Amani+Bar+and+Kitchen+Leederville',
    },
    {
      name: 'The Oxford Hotel',
      map: 'https://maps.google.com/?q=The+Oxford+Hotel+Leederville',
    },
    {
      name: 'Vikka Pizza',
      map: 'https://maps.google.com/?q=Vikka+Pizza+Leederville',
    },
    {
      name: "Anna's Vietnamese",
      map: "https://maps.google.com/?q=Anna's+Vietnamese+Leederville",
    },
    {
      name: 'Curry Munchers',
      map: 'https://maps.google.com/?q=Curry+Munchers+Leederville',
    },
    {
      name: 'Eat Drink Raw',
      map: 'https://maps.google.com/?q=Eat+Drink+Raw+Leederville',
    },
    {
      name: 'The Leaf Indian Restaurant',
      map: 'https://maps.google.com/?q=The+Leaf+Indian+Restaurant+Leederville',
    },
    {
      name: 'Impronta Espresso',
      map: 'https://maps.google.com/?q=Impronta+Espresso+Leederville',
    },
    { name: 'Besk', map: 'https://maps.google.com/?q=Besk+Leederville' },
    {
      name: 'Kailis Bros Fish Cafe',
      map: 'https://maps.google.com/?q=Kailis+Bros+Fish+Cafe+Leederville',
    },
    {
      name: "Siena's Italian",
      map: "https://maps.google.com/?q=Siena's+Italian+Leederville",
    },
    {
      name: 'Aroma & Tea Patisserie',
      map: 'https://maps.google.com/?q=Aroma+and+Tea+Patisserie+Leederville',
    },
    {
      name: 'Brown Street Grill',
      map: 'https://maps.google.com/?q=Brown+Street+Grill+Leederville',
    },
    {
      name: 'Niche Bar',
      map: 'https://maps.google.com/?q=Niche+Bar+Leederville',
    },
    {
      name: 'Will Street Perth',
      map: 'https://maps.google.com/?q=Will+Street+Perth+Leederville',
    },
    { name: 'LupoLab', map: 'https://maps.google.com/?q=LupoLab+Leederville' },
    {
      name: 'The Blue Flamingo',
      map: 'https://maps.google.com/?q=The+Blue+Flamingo+Leederville',
    },
    {
      name: 'The Leederville Precinct',
      map: 'https://maps.google.com/?q=Leederville+Precinct',
    },
    {
      name: 'Grand Cru Wine Shop',
      map: 'https://maps.google.com/?q=Grand+Cru+Wine+Shop+Leederville',
    },
    {
      name: 'Oxford Yard',
      map: 'https://maps.google.com/?q=Oxford+Yard+Leederville',
    },
    {
      name: 'The Classroom',
      map: 'https://maps.google.com/?q=The+Classroom+Leederville',
    },
    {
      name: 'The Garden Bar',
      map: 'https://maps.google.com/?q=The+Garden+Bar+Leederville',
    },
    {
      name: 'The Leederville Hotel',
      map: 'https://maps.google.com/?q=Leederville+Hotel',
    },
    {
      name: 'The Back Bar',
      map: 'https://maps.google.com/?q=The+Back+Bar+Leederville',
    },
    {
      name: 'The Bird',
      map: 'https://maps.google.com/?q=The+Bird+Leederville',
    },
    {
      name: 'The Moon Cafe',
      map: 'https://maps.google.com/?q=The+Moon+Cafe+Leederville',
    },
    {
      name: 'The 21st Amendment',
      map: 'https://maps.google.com/?q=21st+Amendment+Leederville',
    },
  ],
  Northbridge: [
    {
      name: 'Lucky Chan’s Laundry',
      map: 'https://maps.google.com/?q=Lucky+Chan’s+Laundry+Northbridge',
    },
    {
      name: 'Double Rainbow Eating House',
      map: 'https://maps.google.com/?q=Double+Rainbow+Eating+House+Northbridge',
    },
    {
      name: 'No Mafia',
      map: 'https://maps.google.com/?q=No+Mafia+Northbridge',
    },
    {
      name: 'Shanghai Streets',
      map: 'https://maps.google.com/?q=Shanghai+Streets+Northbridge',
    },
    {
      name: 'Bivouac Canteen & Bar',
      map: 'https://maps.google.com/?q=Bivouac+Canteen+Northbridge',
    },
    {
      name: 'La Cholita',
      map: 'https://maps.google.com/?q=La+Cholita+Northbridge',
    },
    { name: 'Sauma', map: 'https://maps.google.com/?q=Sauma+Northbridge' },
    {
      name: 'Francoforte Spaghetti Bar',
      map: 'https://maps.google.com/?q=Francoforte+Spaghetti+Bar+Northbridge',
    },
    {
      name: 'Trà Vinh',
      map: 'https://maps.google.com/?q=Tra+Vinh+Northbridge',
    },
    {
      name: 'Authentic Bites Dumpling House',
      map: 'https://maps.google.com/?q=Authentic+Bites+Dumpling+House+Northbridge',
    },
    {
      name: 'Vincent Wine',
      map: 'https://maps.google.com/?q=Vincent+Wine+Northbridge',
    },
    {
      name: 'Shadow Wine Bar',
      map: 'https://maps.google.com/?q=Shadow+Wine+Bar+Northbridge',
    },
    {
      name: "Johnny Fox's",
      map: "https://maps.google.com/?q=Johnny+Fox's+Northbridge",
    },
    {
      name: 'Pretty Good Pizza',
      map: 'https://maps.google.com/?q=Pretty+Good+Pizza+Northbridge',
    },
    {
      name: 'Tosaka Ramen',
      map: 'https://maps.google.com/?q=Tosaka+Ramen+Northbridge',
    },
    {
      name: 'Munchy Monk',
      map: 'https://maps.google.com/?q=Munchy+Monk+Northbridge',
    },
    {
      name: 'Aisuru Sushi',
      map: 'https://maps.google.com/?q=Aisuru+Sushi+Northbridge',
    },
    {
      name: 'Juicy Bao Bao',
      map: 'https://maps.google.com/?q=Juicy+Bao+Bao+Northbridge',
    },
    {
      name: 'The Standard',
      map: 'https://maps.google.com/?q=The+Standard+Northbridge',
    },
    { name: 'Brika', map: 'https://maps.google.com/?q=Brika+Northbridge' },
    {
      name: 'Old Lane Street Eats',
      map: 'https://maps.google.com/?q=Old+Lane+Street+Eats+Northbridge',
    },
    {
      name: 'Hong Kong BBQ House',
      map: 'https://maps.google.com/?q=Hong+Kong+BBQ+House+Northbridge',
    },
    {
      name: 'Hoodburger',
      map: 'https://maps.google.com/?q=Hoodburger+Northbridge',
    },
    {
      name: 'Baan Baan',
      map: 'https://maps.google.com/?q=Baan+Baan+Northbridge',
    },
    {
      name: 'Wines Of While',
      map: 'https://maps.google.com/?q=Wines+Of+While+Northbridge',
    },
    {
      name: 'Good Fortune Roast Duck House',
      map: 'https://maps.google.com/?q=Good+Fortune+Roast+Duck+House+Northbridge',
    },
    {
      name: 'Billy Lee’s Chinese Restaurant',
      map: 'https://maps.google.com/?q=Billy+Lee’s+Chinese+Restaurant+Northbridge',
    },
    {
      name: 'The Moon Cafe',
      map: 'https://maps.google.com/?q=The+Moon+Cafe+Northbridge',
    },
    {
      name: 'Mustang Bar',
      map: 'https://maps.google.com/?q=Mustang+Bar+Northbridge',
    },
    {
      name: 'Sayers Sister',
      map: 'https://maps.google.com/?q=Sayers+Sister+Northbridge',
    },
    {
      name: "Uncle Billy's",
      map: "https://maps.google.com/?q=Uncle+Billy's+Northbridge",
    },
    {
      name: 'Northbridge Chinese Restaurant',
      map: 'https://maps.google.com/?q=Northbridge+Chinese+Restaurant',
    },
    {
      name: 'Moon Flower Chinese',
      map: 'https://maps.google.com/?q=Moon+Flower+Chinese+Northbridge',
    },
    {
      name: 'Dragon Palace',
      map: 'https://maps.google.com/?q=Dragon+Palace+Northbridge',
    },
    {
      name: 'Thanh Dat Vietnamese',
      map: 'https://maps.google.com/?q=Thanh+Dat+Vietnamese+Northbridge',
    },
    {
      name: 'Perth Thailicious',
      map: 'https://maps.google.com/?q=Perth+Thailicious+Northbridge',
    },
    {
      name: 'Sura & Sinabro',
      map: 'https://maps.google.com/?q=Sura+Sinabro+Northbridge',
    },
    {
      name: 'Kumo Izakaya',
      map: 'https://maps.google.com/?q=Kumo+Izakaya+Northbridge',
    },
    {
      name: 'The Bonsai',
      map: 'https://maps.google.com/?q=The+Bonsai+Northbridge',
    },
    {
      name: 'Viet Hoa',
      map: 'https://maps.google.com/?q=Viet+Hoa+Northbridge',
    },
    {
      name: 'Restaurant 1903',
      map: 'https://maps.google.com/?q=Restaurant+1903+Northbridge',
    },
    {
      name: 'Fortune Five',
      map: 'https://maps.google.com/?q=Fortune+Five+Northbridge',
    },
    {
      name: 'Shadow Wine Bar & Dining Room',
      map: 'https://maps.google.com/?q=Shadow+Wine+Bar+Northbridge',
    },
    {
      name: 'Bivouac Bar and Canteen',
      map: 'https://maps.google.com/?q=Bivouac+Bar+Northbridge',
    },
    {
      name: 'Tak Chee House',
      map: 'https://maps.google.com/?q=Tak+Chee+House+Northbridge',
    },
  ],
  'Mount Lawley': [
    {
      name: 'Le Rebelle',
      map: 'https://maps.google.com/?q=Le+Rebelle+Mount+Lawley',
    },
    {
      name: 'El Publico',
      map: 'https://maps.google.com/?q=El+Publico+Mount+Lawley',
    },
    {
      name: 'Bar Rogue',
      map: 'https://maps.google.com/?q=Bar+Rogue+Mount+Lawley',
    },
    {
      name: 'Solo Pasta',
      map: 'https://maps.google.com/?q=Solo+Pasta+Mount+Lawley',
    },
    {
      name: "Mack Daddy's Pizza",
      map: "https://maps.google.com/?q=Mack+Daddy's+Pizza+Mount+Lawley",
    },
    {
      name: 'Threecoins Italian Trattoria',
      map: 'https://maps.google.com/?q=Threecoins+Italian+Trattoria+Mount+Lawley',
    },
    {
      name: 'Soho Lane Cafe',
      map: 'https://maps.google.com/?q=Soho+Lane+Cafe+Mount+Lawley',
    },
    {
      name: 'Must Winebar',
      map: 'https://maps.google.com/?q=Must+Winebar+Mount+Lawley',
    },
    {
      name: 'Miss Potz',
      map: 'https://maps.google.com/?q=Miss+Potz+Mount+Lawley',
    },
    {
      name: "L'Antica Trattoria",
      map: "https://maps.google.com/?q=L'Antica+Trattoria+Mount+Lawley",
    },
    {
      name: 'Tommasinos Pizza',
      map: 'https://maps.google.com/?q=Tommasinos+Pizza+Mount+Lawley',
    },
    {
      name: 'Get Chunky',
      map: 'https://maps.google.com/?q=Get+Chunky+Mount+Lawley',
    },
    {
      name: 'Monggo Restaurant',
      map: 'https://maps.google.com/?q=Monggo+Restaurant+Mount+Lawley',
    },
    {
      name: 'Kaze Bento',
      map: 'https://maps.google.com/?q=Kaze+Bento+Mount+Lawley',
    },
    {
      name: 'Local and Aesthetic Cafe',
      map: 'https://maps.google.com/?q=Local+and+Aesthetic+Cafe+Mount+Lawley',
    },
    {
      name: 'Secondeli Cafe',
      map: 'https://maps.google.com/?q=Secondeli+Cafe+Mount+Lawley',
    },
    {
      name: 'Little B Cafe',
      map: 'https://maps.google.com/?q=Little+B+Cafe+Mount+Lawley',
    },
    {
      name: 'Lawleys Bakery Cafe',
      map: 'https://maps.google.com/?q=Lawleys+Bakery+Cafe+Mount+Lawley',
    },
    {
      name: 'Clarences Company Store',
      map: 'https://maps.google.com/?q=Clarences+Company+Store+Mount+Lawley',
    },
    {
      name: 'Side Door BBQ',
      map: 'https://maps.google.com/?q=Side+Door+BBQ+Mount+Lawley',
    },
    {
      name: 'Eda Izakaya',
      map: 'https://maps.google.com/?q=Eda+Izakaya+Mount+Lawley',
    },
    {
      name: 'Meet and Bun',
      map: 'https://maps.google.com/?q=Meet+and+Bun+Mount+Lawley',
    },
    {
      name: 'Bagel O’s',
      map: 'https://maps.google.com/?q=Bagel+O’s+Mount+Lawley',
    },
    {
      name: 'Willing Coffee',
      map: 'https://maps.google.com/?q=Willing+Coffee+Mount+Lawley',
    },
    {
      name: 'Butter Crumbs',
      map: 'https://maps.google.com/?q=Butter+Crumbs+Mount+Lawley',
    },
    {
      name: 'Grindhouse Cafe',
      map: 'https://maps.google.com/?q=Grindhouse+Cafe+Mount+Lawley',
    },
    {
      name: 'Bossman Cafe',
      map: 'https://maps.google.com/?q=Bossman+Cafe+Mount+Lawley',
    },
    { name: 'Lotus', map: 'https://maps.google.com/?q=Lotus+Mount+Lawley' },
    {
      name: 'The Beaufort',
      map: 'https://maps.google.com/?q=The+Beaufort+Mount+Lawley',
    },
    { name: 'Cypher', map: 'https://maps.google.com/?q=Cypher+Mount+Lawley' },
    {
      name: 'Testun Restaurant',
      map: 'https://maps.google.com/?q=Testun+Restaurant+Mount+Lawley',
    },
    {
      name: 'Threecoins & Sons',
      map: 'https://maps.google.com/?q=Threecoins+and+Sons+Mount+Lawley',
    },
    {
      name: 'Mr Munchies Sushi',
      map: 'https://maps.google.com/?q=Mr+Munchies+Sushi+Mount+Lawley',
    },
    {
      name: 'Caffissimo Mt Lawley',
      map: 'https://maps.google.com/?q=Caffissimo+Mt+Lawley',
    },
    {
      name: 'The Modern Eatery',
      map: 'https://maps.google.com/?q=The+Modern+Eatery+Mount+Lawley',
    },
    {
      name: 'The Elford',
      map: 'https://maps.google.com/?q=The+Elford+Mount+Lawley',
    },
    { name: 'Grabs', map: 'https://maps.google.com/?q=Grabs+Mount+Lawley' },
    {
      name: 'Measure Bar',
      map: 'https://maps.google.com/?q=Measure+Bar+Mount+Lawley',
    },
    {
      name: '2 Fat Indians',
      map: 'https://maps.google.com/?q=2+Fat+Indians+Mount+Lawley',
    },
    {
      name: "Tommasino's Pinsa e Pasta",
      map: "https://maps.google.com/?q=Tommasino's+Pinsa+e+Pasta+Mount+Lawley",
    },
    {
      name: 'Gusto Gelato',
      map: 'https://maps.google.com/?q=Gusto+Gelato+Mount+Lawley',
    },
    {
      name: 'Planet Books Cafe',
      map: 'https://maps.google.com/?q=Planet+Books+Cafe+Mount+Lawley',
    },
    {
      name: 'Beaufort Local',
      map: 'https://maps.google.com/?q=Beaufort+Local+Mount+Lawley',
    },
  ],
  Fremantle: [
    {
      name: 'Bread in Common',
      map: 'https://maps.google.com/?q=Bread+in+Common+Fremantle',
    },
    {
      name: 'Manuka Woodfire Kitchen',
      map: 'https://maps.google.com/?q=Manuka+Woodfire+Kitchen+Fremantle',
    },
    {
      name: 'Young George',
      map: 'https://maps.google.com/?q=Young+George+Fremantle',
    },
    {
      name: 'Vin Populi',
      map: 'https://maps.google.com/?q=Vin+Populi+Fremantle',
    },
    {
      name: 'Emily Taylor Bar & Kitchen',
      map: 'https://maps.google.com/?q=Emily+Taylor+Fremantle',
    },
    { name: 'La Sosta', map: 'https://maps.google.com/?q=La+Sosta+Fremantle' },
    {
      name: "Nunzio's Restaurant",
      map: "https://maps.google.com/?q=Nunzio's+Restaurant+Fremantle",
    },
    {
      name: 'Char Char Restaurant + Bar',
      map: 'https://maps.google.com/?q=Char+Char+Restaurant+Fremantle',
    },
    {
      name: 'Moore & Moore Cafe',
      map: 'https://maps.google.com/?q=Moore+and+Moore+Cafe+Fremantle',
    },
    {
      name: 'Bib & Tucker',
      map: 'https://maps.google.com/?q=Bib+and+Tucker+Fremantle',
    },
    {
      name: 'Little Creatures',
      map: 'https://maps.google.com/?q=Little+Creatures+Fremantle',
    },
    {
      name: 'The Old Synagogue',
      map: 'https://maps.google.com/?q=The+Old+Synagogue+Fremantle',
    },
    { name: 'Suku', map: 'https://maps.google.com/?q=Suku+Fremantle' },
    {
      name: 'Ohana Acai Bar',
      map: 'https://maps.google.com/?q=Ohana+Acai+Bar+Fremantle',
    },
    {
      name: 'Two Dogs Laughing',
      map: 'https://maps.google.com/?q=Two+Dogs+Laughing+Fremantle',
    },
    {
      name: 'Republic of Fremantle',
      map: 'https://maps.google.com/?q=Republic+of+Fremantle',
    },
    { name: 'Sandrino', map: 'https://maps.google.com/?q=Sandrino+Fremantle' },
    {
      name: 'Sanco Japanese Cuisine',
      map: 'https://maps.google.com/?q=Sanco+Japanese+Cuisine+Fremantle',
    },
    {
      name: 'Flight Club Fremantle',
      map: 'https://maps.google.com/?q=Flight+Club+Fremantle',
    },
    {
      name: 'Isola Bar E Cibo',
      map: 'https://maps.google.com/?q=Isola+Bar+E+Cibo+Fremantle',
    },
    {
      name: "Kailis' Fishmarket Cafe",
      map: 'https://maps.google.com/?q=Kailis+Fishmarket+Cafe+Fremantle',
    },
    { name: 'Cassia', map: 'https://maps.google.com/?q=Cassia+Fremantle' },
    {
      name: 'Moon & Mary',
      map: 'https://maps.google.com/?q=Moon+and+Mary+Fremantle',
    },
    {
      name: "Shirley's",
      map: "https://maps.google.com/?q=Shirley's+Fremantle",
    },
    {
      name: 'Jetty Bar & Eats',
      map: 'https://maps.google.com/?q=Jetty+Bar+and+Eats+Fremantle',
    },
    {
      name: 'La Cabaña',
      map: 'https://maps.google.com/?q=La+Cabana+Fremantle',
    },
    {
      name: 'Lions and Tigers',
      map: 'https://maps.google.com/?q=Lions+and+Tigers+Fremantle',
    },
    { name: 'Lola’s', map: "https://maps.google.com/?q=Lola's+Fremantle" },
    {
      name: 'Madalena’s',
      map: "https://maps.google.com/?q=Madalena's+Fremantle",
    },
    {
      name: 'Nieuw Ruin',
      map: 'https://maps.google.com/?q=Nieuw+Ruin+Fremantle',
    },
    { name: 'Peggy’s', map: "https://maps.google.com/?q=Peggy's+Fremantle" },
    {
      name: 'Mother India',
      map: 'https://maps.google.com/?q=Mother+India+Fremantle',
    },
    {
      name: 'Bennys Bar & Cafe',
      map: 'https://maps.google.com/?q=Bennys+Bar+and+Cafe+Fremantle',
    },
    {
      name: 'Gypsy Tapas House',
      map: 'https://maps.google.com/?q=Gypsy+Tapas+House+Fremantle',
    },
    {
      name: 'The Old Courthouse',
      map: 'https://maps.google.com/?q=The+Old+Courthouse+Fremantle',
    },
    {
      name: 'Cos Baby Freo',
      map: 'https://maps.google.com/?q=Cos+Baby+Freo+Fremantle',
    },
    {
      name: 'Joy Kitchen',
      map: 'https://maps.google.com/?q=Joy+Kitchen+Fremantle',
    },
    {
      name: 'Tonic & Ginger',
      map: 'https://maps.google.com/?q=Tonic+and+Ginger+Fremantle',
    },
    {
      name: 'H&C Urban Winery',
      map: 'https://maps.google.com/?q=H+C+Urban+Winery+Fremantle',
    },
    {
      name: "Aunty Lucy's Cakery",
      map: 'https://maps.google.com/?q=Aunty+Lucy+Cakery+Fremantle',
    },
    {
      name: "Culley's Tea Rooms",
      map: "https://maps.google.com/?q=Culley's+Tea+Rooms+Fremantle",
    },
    {
      name: 'Duck Duck Bruce',
      map: 'https://maps.google.com/?q=Duck+Duck+Bruce+Fremantle',
    },
    {
      name: "Clancy's Fish Pub",
      map: "https://maps.google.com/?q=Clancy's+Fish+Pub+Fremantle",
    },
    {
      name: 'The Mantle',
      map: 'https://maps.google.com/?q=The+Mantle+Fremantle',
    },
    {
      name: 'The Raw Kitchen',
      map: 'https://maps.google.com/?q=The+Raw+Kitchen+Fremantle',
    },
    {
      name: "Gino's Cafe",
      map: "https://maps.google.com/?q=Gino's+Cafe+Fremantle",
    },
    {
      name: 'Whisper Wine Bar',
      map: 'https://maps.google.com/?q=Whisper+Wine+Bar+Fremantle',
    },
  ],
  Subiaco: [
    {
      name: 'Yiamas',
      map: 'https://maps.google.com/?q=Yiamas+26+Denis+St+Subiaco+WA+6008',
    },
    {
      name: 'Intuition Wine and Kitchen',
      map: 'https://maps.google.com/?q=Intuition+Wine+and+Kitchen+279+Rokeby+Rd+Subiaco+WA+6008',
    },
    {
      name: 'Shui',
      map: 'https://maps.google.com/?q=Shui+12+Rokeby+Rd+Subiaco+WA+6008',
    },
    {
      name: 'La Condesa',
      map: 'https://maps.google.com/?q=La+Condesa+483+Hay+St+Subiaco+WA+6008',
    },
    {
      name: 'Lulu La Delizia',
      map: 'https://maps.google.com/?q=Lulu+La+Delizia+5%2F97+Rokeby+Rd+Subiaco+WA+6008',
    },
    {
      name: 'Lums Wine Bar',
      map: 'https://maps.google.com/?q=Lums+Wine+Bar+433+Hay+St+Subiaco+WA+6008',
    },
    {
      name: 'Il Locale',
      map: 'https://maps.google.com/?q=Il+Locale+4%2F420+Hay+St+Subiaco+WA+6008',
    },
    {
      name: 'Lady of Ro',
      map: 'https://maps.google.com/?q=Lady+of+Ro+345+Rokeby+Rd+Subiaco+WA+6008',
    },
    {
      name: 'Bar Amelie',
      map: 'https://maps.google.com/?q=Bar+Amelie+118+Rokeby+Rd+Subiaco+WA+6008',
    },
    {
      name: 'Bark',
      map: 'https://maps.google.com/?q=Bark+502+Hay+St+Subiaco+WA+6008',
    },
    {
      name: 'Subiaco Hotel',
      map: 'https://maps.google.com/?q=Subiaco+Hotel+465+Hay+St+Subiaco+WA+6008',
    },
    {
      name: "Juanita's",
      map: "https://maps.google.com/?q=Juanita's+341+Rokeby+Rd+Subiaco+WA+6008",
    },
    {
      name: 'Cherubino City Cellar',
      map: 'https://maps.google.com/?q=Cherubino+City+Cellar+169-171+Rokeby+Rd+Subiaco+WA+6008',
    },
    {
      name: 'Refuge Small Bar',
      map: 'https://maps.google.com/?q=Refuge+Small+Bar+5%2F50+Subiaco+Square+Rd+Subiaco+WA+6008',
    },
    {
      name: 'Storehouse',
      map: 'https://maps.google.com/?q=Storehouse+9+Alvan+St+Subiaco+WA+6008',
    },
    {
      name: 'Found Brewpub',
      map: 'https://maps.google.com/?q=Found+399+Hay+St+Subiaco+WA+6008',
    },
  ],
  'South Perth': [
    {
      name: 'Rambla on Swan',
      map: 'https://maps.google.com/?q=Rambla+on+Swan+South+Perth',
    },
    {
      name: 'The Boatshed Restaurant',
      map: 'https://maps.google.com/?q=The+Boatshed+Restaurant+South+Perth',
    },
    {
      name: 'The Windsor Hotel',
      map: 'https://maps.google.com/?q=The+Windsor+Hotel+South+Perth',
    },
    {
      name: 'Mister Walker',
      map: 'https://maps.google.com/?q=Mister+Walker+South+Perth',
    },
    {
      name: 'The Station',
      map: 'https://maps.google.com/?q=The+Station+South+Perth',
    },
    { name: 'Ludo', map: 'https://maps.google.com/?q=Ludo+South+Perth' },
    {
      name: 'Nextdoor',
      map: 'https://maps.google.com/?q=Nextdoor+South+Perth',
    },
    {
      name: "Miss Chow's",
      map: "https://maps.google.com/?q=Miss+Chow's+South+Perth",
    },
    {
      name: 'Solo Pizza',
      map: 'https://maps.google.com/?q=Solo+Pizza+South+Perth',
    },
    {
      name: 'Ciao Italia',
      map: 'https://maps.google.com/?q=Ciao+Italia+South+Perth',
    },
    {
      name: 'Dirty Habit',
      map: 'https://maps.google.com/?q=Dirty+Habit+South+Perth',
    },
    { name: 'Gogo’s', map: "https://maps.google.com/?q=Gogo's+South+Perth" },
    { name: 'Akiras', map: 'https://maps.google.com/?q=Akiras+South+Perth' },
    {
      name: 'Namaste Kitchen',
      map: 'https://maps.google.com/?q=Namaste+Kitchen+South+Perth',
    },
    {
      name: 'The Sarapan',
      map: 'https://maps.google.com/?q=The+Sarapan+South+Perth',
    },
  ],
  'East Perth': [
    {
      name: 'Han Palace',
      map: 'https://maps.google.com/?q=Han+Palace+73-75+Bennett+Street+East+Perth+WA+6004',
    },
    {
      name: 'Maruzzella Restaurant',
      map: 'https://maps.google.com/?q=Maruzzella+Restaurant+63+Bennett+Street+East+Perth+WA+6004',
    },
    {
      name: 'The Royal East Perth',
      map: 'https://maps.google.com/?q=The+Royal+East+Perth+60+Royal+Street+East+Perth+WA+6004',
    },
    {
      name: 'Art of Seafood',
      map: 'https://maps.google.com/?q=Art+of+Seafood+306+Riverside+Drive+East+Perth+WA+6004',
    },
    {
      name: 'Brown Street Grill',
      map: 'https://maps.google.com/?q=Brown+Street+Grill+East+Perth+WA',
    },
    {
      name: 'The Partisan',
      map: 'https://maps.google.com/?q=The+Partisan+Claisebrook+Cove+East+Perth+WA',
    },
    {
      name: 'Toast Cafe',
      map: 'https://maps.google.com/?q=Toast+Cafe+East+Perth+WA',
    },
    {
      name: 'Sen5es Restaurant and Wine Bar',
      map: 'https://maps.google.com/?q=Sen5es+Restaurant+and+Wine+Bar+East+Perth+WA',
    },
    {
      name: 'Wok & Ladle: Thai Eatery',
      map: 'https://maps.google.com/?q=Wok+and+Ladle+Thai+Eatery+East+Perth+WA',
    },
    {
      name: 'Gioia On The River',
      map: 'https://maps.google.com/?q=Gioia+On+The+River+East+Perth+WA',
    },
  ],
  Scarborough: [
    {
      name: 'Grace St Café',
      map: 'https://maps.google.com/?q=Grace+St+Cafe+Scarborough+WA',
    },
    {
      name: 'Alchemy Brew House',
      map: 'https://maps.google.com/?q=Alchemy+Brew+House+Scarborough+WA',
    },
    {
      name: 'Il Locale Pizzeria',
      map: 'https://maps.google.com/?q=Il+Locale+Pizzeria+Scarborough+WA',
    },
    {
      name: 'La Capannina',
      map: 'https://maps.google.com/?q=La+Capannina+Scarborough+WA',
    },
    {
      name: 'Scarborough Beach Bar',
      map: 'https://maps.google.com/?q=Scarborough+Beach+Bar+Scarborough+WA',
    },
    {
      name: 'The Sandbar',
      map: 'https://maps.google.com/?q=The+Sandbar+Scarborough+WA',
    },
    {
      name: 'El Grotto',
      map: 'https://maps.google.com/?q=El+Grotto+Scarborough+WA',
    },
    {
      name: 'Drift Kitchen',
      map: 'https://maps.google.com/?q=Drift+Kitchen+Scarborough+WA',
    },
    {
      name: 'Pizzaca Café',
      map: 'https://maps.google.com/?q=Pizzaca+Cafe+Scarborough+WA',
    },
    {
      name: 'Samari Cambodian Restaurant',
      map: 'https://maps.google.com/?q=Samari+Cambodian+Restaurant+Scarborough+WA',
    },
    {
      name: 'Al Fornetto',
      map: 'https://maps.google.com/?q=Al+Fornetto+Scarborough+WA',
    },
    {
      name: 'Oceans 6019',
      map: 'https://maps.google.com/?q=Oceans+6019+Scarborough+WA',
    },
    {
      name: "Uncle Gino's Pizza",
      map: "https://maps.google.com/?q=Uncle+Gino's+Pizza+Scarborough+WA",
    },
    {
      name: 'The Galway Hooker',
      map: 'https://maps.google.com/?q=The+Galway+Hooker+Scarborough+WA',
    },
    {
      name: 'White Sands Tavern',
      map: 'https://maps.google.com/?q=White+Sands+Tavern+Scarborough+WA',
    },
    {
      name: "Baybay's on Scarborough",
      map: "https://maps.google.com/?q=Baybay's+on+Scarborough+WA",
    },
    {
      name: 'Fortuna Chinese Restaurant',
      map: 'https://maps.google.com/?q=Fortuna+Chinese+Restaurant+Scarborough+WA',
    },
    {
      name: 'Kinky Swell Cafe',
      map: 'https://maps.google.com/?q=Kinky+Swell+Cafe+Scarborough+WA',
    },
    {
      name: 'Two Slices Sandwich Bar',
      map: 'https://maps.google.com/?q=Two+Slices+Sandwich+Bar+Scarborough+WA',
    },
    {
      name: 'The Lookout Bar',
      map: 'https://maps.google.com/?q=The+Lookout+Bar+Scarborough+WA',
    },
  ],
  Cottesloe: [
    {
      name: 'Il Lido Italian Canteen',
      map: 'https://maps.google.com/?q=Il+Lido+Italian+Canteen+Cottesloe',
    },
    {
      name: 'Gibney',
      map: 'https://maps.google.com/?q=Gibney+40+Marine+Parade+Cottesloe+WA+6011',
    },
    {
      name: 'Vans Cafe & Deli',
      map: 'https://maps.google.com/?q=Vans+Cafe+and+Deli+Cottesloe',
    },
    { name: 'Longview', map: 'https://maps.google.com/?q=Longview+Cottesloe' },
    {
      name: 'John Street Cafe',
      map: 'https://maps.google.com/?q=John+Street+Cafe+Cottesloe',
    },
    {
      name: 'Albion Hotel',
      map: 'https://maps.google.com/?q=Albion+Hotel+Cottesloe',
    },
    {
      name: 'Cottesloe Beach Cafe',
      map: 'https://maps.google.com/?q=Cottesloe+Beach+Cafe',
    },
    {
      name: "Lamont's Wine Store",
      map: "https://maps.google.com/?q=Lamont's+Wine+Store+Cottesloe",
    },
    {
      name: 'The Bistro Cottesloe Beach Hotel',
      map: 'https://maps.google.com/?q=The+Bistro+Cottesloe+Beach+Hotel',
    },
    {
      name: 'The Beach Club',
      map: 'https://maps.google.com/?q=The+Beach+Club+Cottesloe',
    },
    {
      name: 'Canteen Pizza',
      map: 'https://maps.google.com/?q=Canteen+Pizza+Cottesloe',
    },
    {
      name: 'Daisies Cottesloe',
      map: 'https://maps.google.com/?q=Daisies+Cottesloe',
    },
    {
      name: 'Amberjacks Fish and Chips',
      map: 'https://maps.google.com/?q=Amberjacks+Fish+and+Chips+Cottesloe',
    },
    {
      name: 'North Street Store',
      map: 'https://maps.google.com/?q=North+Street+Store+Cottesloe',
    },
    {
      name: 'Coccodrillo Pizza & Vino',
      map: 'https://maps.google.com/?q=Coccodrillo+Pizza+and+Vino+Cottesloe',
    },
  ],
};

const loadRestaurants = async () => {
  try {
    const storedData = await AsyncStorage.getItem('suburbRestaurants');
    if (storedData) {
      suburbRestaurants = JSON.parse(storedData);
    } else {
      suburbRestaurants = defaultRestaurants;
      await AsyncStorage.setItem(
        'suburbRestaurants',
        JSON.stringify(defaultRestaurants)
      );
    }
  } catch (error) {
    console.error('Failed to load restaurants:', error);
  }
};

const saveRestaurants = async () => {
  try {
    await AsyncStorage.setItem(
      'suburbRestaurants',
      JSON.stringify(suburbRestaurants)
    );
  } catch (error) {
    console.error('Failed to save restaurants:', error);
  }
};

const reasons = [
  'Because you survived Monday.',
  'Because your taste buds deserve a party.',
  'Because leftovers are for quitters.',
  "Because you're too hot for home cooking.",
  'Because your fridge is judging you.',
  'Because you earned it, legend.',
  'Because your stomach said so.',
  'Because food is love, and you deserve love.',
  'Because cooking is just heating regrets.',
  'Because your microwave deserves a break.',
  'Because your kitchen is a crime scene.',
  "Because your oven hasn't seen action since 2019.",
  "Because you Googled 'how to boil water' last week.",
  'Because your smoke alarm is tired of your cooking.',
  'Because your taste buds filed a complaint.',
  "Because you deserve a meal that doesn't come in a box.",
  'Because your fridge only has condiments and sadness.',
  'Because your last meal was cereal with water.',
  'Because your cooking makes instant noodles look gourmet.',
  'Because you deserve a meal that doesn’t involve a can opener.',
  "Because your idea of seasoning is 'hope'.",
  'Because your dinner plans were just crying in the pantry.',
  'Because sometimes cooking feels like a group project you didn’t sign up for.',
  'Because your kitchen deserves a night off too.',
  'Because your taste buds are ready to party.',
  'Because you’ve earned a delicious detour.',
  'Because your fridge is just a cold disappointment.',
  'Because your oven is purely decorative.',
  'Because you’re too fabulous to wash dishes tonight.',
  'Because your microwave beeped in protest.',
  'Because food is joy, and joy is mandatory.',
  'Because your stomach just filed a formal request.',
  'Because your pantry is a sad place right now.',
  'Because you deserve a meal that doesn’t come with instructions.',
  'Because your cooking playlist is just the sound of crying.',
  'Because your last meal was cereal with water.',
  'Because your spice rack is just salt and regret.',
  'Because your dinner plans were cancelled by your appetite.',
  "Because your idea of seasoning is 'hope'.",
  'Because your fridge only has condiments and confusion.',
  'Because your taste buds are bored and rebellious.',
  'Because your kitchen is haunted by burnt toast.',
  'Because you deserve a meal that sparks joy.',
  "Because your stomach said 'treat yo self'.",
  'Because your cooking makes instant noodles look gourmet.',
  'Because your oven hasn’t seen action since 2019.',
  'Because your smoke alarm is tired of your cooking.',
  'Because your dinner plans were just crying in the pantry.',
  'Because your fridge is judging you silently.',
  'Because your stomach is staging a protest.',
  'Because your cooking is a fire hazard.',
  'Because your last recipe was a disasterpiece.',
  'Because your food deserves to be Instagrammable.',
  'Because your taste buds are craving adventure.',
  'Because your kitchen is closed for renovations (emotionally).',
  'Because your stomach is writing poetry about hunger.',
  'Because your cooking show is just you panicking.',
  'Because your fridge light flickers in disappointment.',
];

export default function App() {
  useEffect(() => {
    loadRestaurants();
  }, []);
  const [name, setName] = useState('');

  useEffect(() => {
    const loadName = async () => {
      const storedName = await AsyncStorage.getItem('userName');
      if (storedName) setName(storedName);
    };
    loadName();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('userName', name);
  }, [name]);

  const [suburb, setSuburb] = useState('');
  const [selected, setSelected] = useState('');
  const [reason, setReason] = useState('');
  const [screen, setScreen] = useState('name');
  const [newRestaurantName, setNewRestaurantName] = useState('');
  const [newSuburbName, setNewSuburbName] = useState('');
  const [newRestaurantMap, setNewRestaurantMap] = useState('');
  const [removeSuburb, setRemoveSuburb] = useState('');
  const [removeRestaurant, setRemoveRestaurant] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const handlePress = (action) => {
    Haptics.selectionAsync();
    action();
  };

  const pickRandomRestaurant = () => {
    handlePress(() => {
      setSelected('');
      setReason('');
      setShowConfetti(false);

      setTimeout(() => {
        const suburbList = suburbRestaurants[suburb];

        // ✅ Check if the list exists and has restaurants
        if (!suburbList || suburbList.length === 0) {
          alert('No restaurants found in this suburb yet. Try adding some!');
          return;
        }

        const { name, map } =
          suburbList[Math.floor(Math.random() * suburbList.length)];
        const randomReason =
          reasons[Math.floor(Math.random() * reasons.length)];

        setSelected({ name, map });
        setReason(randomReason);
        setShowConfetti(true);
      }, 1500);
    });
  };

  const shareRestaurant = async () => {
    if (!selected) return;

    try {
      await Share.share({
        message: `Hey! Let's check out ${selected.name} in ${suburb}. 📍 ${selected.map}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const renderSuburbItem = ({ item }) => (
    <TouchableOpacity
      style={styles.suburbCard}
      onPress={() =>
        handlePress(() => {
          setSuburb(item);
          setSelected('');
          setReason('');
          setShowConfetti(false);
          setScreen('picker');
        })
      }
      activeOpacity={0.7}>
      <Text style={styles.suburbCardText}>📍 {item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {screen === 'name' && (
        <>
          <Text style={styles.header}>🍽️ Perth Food Picker</Text>
          <Text style={styles.subheader}>Let’s find your next meal</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#aaa"
          />

          <View style={styles.buttonWrapper}>
            <Button
              title="Next"
              onPress={() => handlePress(() => setScreen('suburb'))}
              color="#4CAF50"
            />
          </View>
        </>
      )}

      {screen === 'suburb' && (
        <>
          <TouchableOpacity
            onPress={async () => {
              AsyncStorage.removeItem('userName');
              setName('');
              setScreen('name');
            }}
            style={{ position: 'absolute', top: 42, left: 5 }}>
            <Text
              style={{ color: '#34A853', fontWeight: 'bold', fontSize: 11 }}>
              ← Change User
            </Text>
          </TouchableOpacity>

          <Text style={styles.header}>Hi {name || 'friend'} 👋</Text>
          <Text style={styles.subheader}>Choose your suburb:</Text>
          <Text style={{ fontSize: 22, fontWeight: '600', marginBottom: 10 }}>
            Select a Suburb
          </Text>
          <View
            style={{
              height: 1,
              backgroundColor: 'skyblue',
              marginBottom: 10,
              width: '100%',
            }}
          />

          <FlatList
            data={Object.keys(suburbRestaurants)}
            renderItem={renderSuburbItem}
            keyExtractor={(item) => item}
            contentContainerStyle={styles.suburbList}
          />
          <Text
            style={styles.addRestaurantLink}
            onPress={() => setScreen('add')}>
            ➕ Add a New Restaurant
          </Text>
          <Text
            style={styles.addRestaurantLink}
            onPress={() => setScreen('remove')}>
            🗑️ Remove a Restaurant or Suburb
          </Text>
          <Text
            style={styles.addRestaurantLink}
            onPress={() => setScreen('clear')}>
            🧹 Clear All Restaurants
          </Text>
          <Text
            style={styles.addRestaurantLink}
            onPress={() => setScreen('addSuburb')}>
            🏙️ Add a New Suburb
          </Text>
        </>
      )}

      {screen === 'clear' && (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 20,
          }}>
          <Text style={styles.header}>Clear All Restaurants</Text>
          <Text style={[styles.subheader, { textAlign: 'center' }]}>
            This will remove all restaurants from every suburb. Are you sure?
          </Text>

          <View style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
            <View style={{ width: '80%' }}>
              <Button
                title="Yes, Clear All"
                onPress={async () => {
                  Object.keys(suburbRestaurants).forEach((sub) => {
                    suburbRestaurants[sub] = [];
                  });
                  alert('All restaurants have been cleared.');
                  setScreen('suburb');
                }}
                color="#f44336"
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => setScreen('suburb')}
            style={{ marginTop: 30 }}>
            <Text style={[styles.backLink, { textAlign: 'center' }]}>
              ← Back to Suburb
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {screen === 'addSuburb' && (
        <View
          style={{
            flex: 1,
            backgroundColor: '#f4f6f8',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 24,
          }}>
          <Text style={styles.header}>🏙️ Add a New Suburb</Text>
          <Text style={[styles.subheader, { marginBottom: 30 }]}>
            Let’s expand your foodie map!
          </Text>

          <TextInput
            style={[styles.input, { width: '80%', textAlign: 'center' }]}
            placeholder="📍 Enter suburb name"
            value={newSuburbName}
            onChangeText={setNewSuburbName}
            placeholderTextColor="#aaa"
          />

          <View style={[styles.buttonWrapper, { width: '80%', marginTop: 10 }]}>
            <Button
              title="✅ Add"
              onPress={async () => {
                if (!newSuburbName.trim()) return;
                if (suburbRestaurants[newSuburbName]) {
                  alert('Suburb already exists.');
                } else {
                  suburbRestaurants[newSuburbName] = [];
                  await AsyncStorage.setItem(
                    'suburbRestaurants',
                    JSON.stringify(suburbRestaurants)
                  );
                  alert(`${newSuburbName} added!`);
                  setNewSuburbName('');
                  setScreen('suburb');
                }
              }}
              color="#4CAF50"
            />
          </View>

          <Text
            style={{
              textAlign: 'center',
              marginTop: 30,
              fontStyle: 'italic',
              color: '#666',
            }}>
            “Every great meal starts with the right postcode.” 🗺️
          </Text>

          <TouchableOpacity onPress={() => setScreen('suburb')}>
            <Text
              style={[styles.backLink, { textAlign: 'center', marginTop: 30 }]}>
              ← Back to Suburb
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {screen === 'add' && (
        <View style={{ flex: 1, backgroundColor: '#f4f6f8' }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24 }}>
              <Text style={styles.header}>🍽️ Add a New Restaurant</Text>
              <Text style={styles.subheader}>🏙️ Choose a Suburb:</Text>

              <FlatList
                data={Object.keys(suburbRestaurants)}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => setRemoveSuburb(item)}
                    style={[
                      styles.restaurant,
                      item === removeSuburb
                        ? { backgroundColor: '#d0f0ff', borderColor: '#2196F3' }
                        : null,
                    ]}>
                    <Text
                      style={[styles.suburbCardText, { fontWeight: 'bold' }]}>
                      📍 {item}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item}
              />

              <Text style={styles.subheader}>📝 Restaurant Details:</Text>

              <TextInput
                style={styles.input}
                placeholder="🍴 Restaurant Name"
                value={newRestaurantName}
                onChangeText={setNewRestaurantName}
                placeholderTextColor="#aaa"
              />
              <TextInput
                style={styles.input}
                placeholder="📍 Google Maps Link"
                value={newRestaurantMap}
                onChangeText={setNewRestaurantMap}
                placeholderTextColor="#aaa"
              />

              <View style={styles.buttonWrapper}>
                <Button
                  title="✅ Save Restaurant"
                  onPress={async () => {
                    if (
                      !newRestaurantName ||
                      !newRestaurantMap ||
                      !removeSuburb
                    )
                      return;
                    suburbRestaurants[removeSuburb].push({
                      name: newRestaurantName,
                      map: newRestaurantMap,
                    });

                    await AsyncStorage.setItem(
                      'suburbRestaurants',
                      JSON.stringify(suburbRestaurants)
                    );

                    setNewRestaurantName('');
                    setNewRestaurantMap('');
                    alert(`${newRestaurantName} added to ${removeSuburb}`);
                    setScreen('suburb');
                  }}
                  color="#2196F3"
                />
              </View>

              <TouchableOpacity onPress={() => setScreen('suburb')}>
                <Text
                  style={[
                    styles.backLink,
                    { textAlign: 'center', marginTop: 30 },
                  ]}>
                  ← Back to Suburb
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      )}

      {screen === 'remove' && (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <Text style={styles.header}>Remove a Restaurant</Text>
          <Text style={styles.subheader}>Select Suburb:</Text>

          <FlatList
            data={Object.keys(suburbRestaurants)}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setRemoveSuburb(item)}>
                <Text
                  style={[
                    styles.suburbCardText,
                    { textAlign: 'center', marginVertical: 6 },
                  ]}>
                  📍 {item}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
          />

          {removeSuburb !== '' && (
            <>
              <Text style={styles.subheader}>Select Restaurant:</Text>

              <FlatList
                data={suburbRestaurants[removeSuburb]}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => setRemoveRestaurant(item.name)}>
                    <Text
                      style={[
                        styles.removeRestaurantLink,
                        { textAlign: 'center', marginVertical: 6 },
                      ]}>
                      🍽️ {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.name}
              />

              <View
                style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
                <View style={{ width: '80%' }}>
                  <Button
                    title={`Remove ${removeRestaurant}`}
                    onPress={async () => {
                      suburbRestaurants[removeSuburb] = suburbRestaurants[
                        removeSuburb
                      ].filter((r) => r.name !== removeRestaurant);
                      await AsyncStorage.setItem(
                        'suburbRestaurants',
                        JSON.stringify(suburbRestaurants)
                      );
                      alert(`${removeRestaurant} removed from ${removeSuburb}`);
                      setRemoveRestaurant('');
                      setScreen('suburb');
                    }}
                    color="#f44336"
                  />
                </View>
              </View>

              {/* ✅ New Remove Suburb Button */}
              <View
                style={{ width: '100%', alignItems: 'center', marginTop: 30 }}>
                <Text style={styles.subheader}>
                  Or remove the entire suburb:
                </Text>
                <View style={{ width: '80%' }}>
                  <Button
                    title={`Remove ${removeSuburb}`}
                    onPress={async () => {
                      delete suburbRestaurants[removeSuburb];
                      await AsyncStorage.setItem(
                        'suburbRestaurants',
                        JSON.stringify(suburbRestaurants)
                      );
                      alert(`${removeSuburb} has been removed.`);
                      setRemoveSuburb('');
                      setRemoveRestaurant('');
                      setScreen('suburb');
                    }}
                    color="#f44336"
                  />
                </View>
              </View>
            </>
          )}

          <TouchableOpacity onPress={() => setScreen('suburb')}>
            <Text
              style={[styles.backLink, { textAlign: 'center', marginTop: 30 }]}>
              ← Back to Suburb
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {screen === 'picker' && (
        <>
          <Text style={styles.header}>Let’s eat in {suburb}</Text>

          <View style={styles.buttonWrapper}>
            <Button
              title="Pick a Restaurant"
              onPress={pickRandomRestaurant}
              color="#2196F3"
            />
          </View>
          {selected ? (
            <>
              {showConfetti && <Text style={styles.confetti}>🎉🎊✨🎉🎊</Text>}
              <Text style={styles.result}>
                {name ? `${name},` : ''} you should go try:
              </Text>
              <Text style={styles.restaurant}>{selected.name}</Text>
              <Text style={styles.reason}>{reason}</Text>
              <Text
                style={styles.mapLink}
                onPress={() => Linking.openURL(selected.map)}>
                📍 View on Map
              </Text>

              <TouchableOpacity onPress={shareRestaurant}>
                <Text style={styles.shareLink}>🔗 Share this pick</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    'https://www.paypal.com/donate/?business=7Y5DHJPG76C54&no_recurring=0&currency_code=AUD'
                  )
                }>
                <Text style={styles.coffeeLink}>
                  ☕ Shout the creator a coffee will ya
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.waiting}>
              🤔 Thinking of something delicious...
            </Text>
          )}
          <TouchableOpacity
            onPress={() =>
              handlePress(() => {
                setSelected('');
                setReason('');
                setShowConfetti(false);
                setScreen('suburb');
              })
            }>
            <Text style={styles.backLink}>← Change Suburb</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    width: '100%',
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  buttonWrapper: {
    width: '100%',
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  suburbList: {
    paddingTop: 10,
    width: '100%',
  },
  suburbCard: {
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    width: '100%',
  },
  suburbCardText: {
    fontSize: 27,
    color: '#333',
    textAlign: 'left', // or remove this line entirely
    width: '100%',
    paddingHorizontal: 10,
  },
  result: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: '500',
    color: '#444',
    textAlign: 'center',
  },
  restaurant: {
    fontSize: 26,
    color: '#222',
    marginTop: 10,
    textAlign: 'center',
  },
  reason: {
    marginTop: 10,
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666',
    textAlign: 'center',
  },
  confetti: {
    fontSize: 30,
    marginTop: 20,
    textAlign: 'center',
  },
  waiting: {
    marginTop: 20,
    fontSize: 18,
    color: '#999',
    fontStyle: 'italic',
  },
  backLink: {
    marginTop: 30,
    fontSize: 16,
    color: '#2196F3',
    textDecorationLine: 'underline',
  },
  mapLink: {
    marginTop: 10,
    fontSize: 16,
    color: '#007AFF',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  shareLink: {
    marginTop: 6,
    fontSize: 16,
    color: '#34A853',
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  addRestaurantLink: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#34A853',
    textAlign: 'center',
    textDecorationLine: 'underline',
    paddingVertical: 10,
  },
  removeRestaurantLink: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E53935', // A rich red that fits your palette
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  coffeeLink: {
    marginTop: 6,
    fontSize: 16,
    color: '#FF8C00',
    textAlign: 'center',
    textDecorationLine: 'underline',
    opacity: 0.8,
  },
});
