"use client"

import { useState } from "react";
import { Calendar, MapPin, Users, Clock } from "lucide-react";

export default function TraditionsPage() {
  const today = new Date();
  const [selectedTradition, setSelectedTradition] = useState<string | null>(null);

  const traditions = [
    // Spring Celebrations
    {
      id: "nowruz",
      date: "March 21",
      name: "Nowruz/Navruz",
      country: "All Central Asia",
      desc: "Persian New Year marking the spring equinox. Celebrated across Central Asia with haft-sin table, traditional foods, and community gatherings.",
      longDesc: "Nowruz (Persian) and Navruz (Tajik/Uzbek) meaning 'new day', is the most important celebration across Central Asia. It marks the beginning of spring and the Persian New Year. Celebrated in Kazakhstan, Kyrgyzstan, Uzbekistan, Tajikistan, and Turkmenistan with traditions including setting up a haft-sin table with seven items starting with 'S', spring cleaning, visiting family and friends, and enjoying traditional dishes like sumalak (wheat pudding) and samsa.",
      activities: ["Haft-sin table setup", "Spring cleaning", "Family visits", "Traditional cooking", "Community celebrations"],
      isActive: today.getMonth() === 2 && today.getDate() >= 20 && today.getDate() <= 25
    },
    {
      id: "tulip-festival",
      date: "April",
      name: "Tulip Festival",
      country: "Kazakhstan",
      desc: "Celebration of spring with tulip fields and traditional music performances.",
      longDesc: "The Tulip Festival celebrates the arrival of spring with the blooming of wild tulips across Kazakhstan's steppes. This festival includes traditional music performances, folk dancing, and cultural exhibitions showcasing Kazakh nomadic traditions.",
      activities: ["Tulip viewing", "Traditional music", "Folk dancing", "Cultural exhibitions"],
      isActive: today.getMonth() === 3
    },

    // Summer Celebrations
    {
      id: "kumis-festival",
      date: "June",
      name: "Kumis Festival",
      country: "Kazakhstan",
      desc: "Traditional fermented mare's milk celebration with nomadic games and competitions.",
      longDesc: "The Kumis Festival celebrates the traditional fermented mare's milk, a staple of nomadic culture. The festival includes traditional games like kokpar (goat grabbing), horse racing, and cultural performances showcasing nomadic lifestyle.",
      activities: ["Kumis tasting", "Kokpar games", "Horse racing", "Nomadic games", "Cultural performances"],
      isActive: today.getMonth() === 5
    },
    {
      id: "eid-al-fitr",
      date: "Variable (Islamic calendar)",
      name: "Eid al-Fitr",
      country: "All Central Asia",
      desc: "Festival of Breaking the Fast, marking the end of Ramadan with communal prayers and feasting.",
      longDesc: "Eid al-Fitr is celebrated by Muslim communities across Central Asia after the month of Ramadan. The day begins with communal prayers, followed by family gatherings, gift-giving, and feasting on traditional dishes like plov, samsa, and various sweets.",
      activities: ["Communal prayers", "Family gatherings", "Gift-giving", "Traditional feasting", "Charity"],
      isActive: false
    },
    {
      id: "nomad-games",
      date: "September",
      name: "World Nomad Games",
      country: "Kyrgyzstan",
      desc: "International celebration of nomadic culture with traditional sports and cultural events.",
      longDesc: "The World Nomad Games showcase traditional nomadic sports and cultural heritage. Events include eagle hunting, kok-boru (goat polo), traditional wrestling, and cultural performances representing nomadic traditions from across Central Asia.",
      activities: ["Eagle hunting", "Kok-boru", "Traditional wrestling", "Cultural performances", "Nomadic sports"],
      isActive: today.getMonth() === 8
    },

    // Autumn Celebrations
    {
      id: "harvest-festival",
      date: "October",
      name: "Harvest Festival",
      country: "Uzbekistan",
      desc: "Celebration of agricultural abundance with traditional harvest songs and dances.",
      longDesc: "The Harvest Festival celebrates the agricultural bounty of Uzbekistan. Communities come together to share traditional harvest songs, perform folk dances, and enjoy the fruits of their labor with communal feasts featuring local produce.",
      activities: ["Harvest songs", "Folk dancing", "Communal feasts", "Agricultural displays"],
      isActive: today.getMonth() === 9
    },
    {
      id: "eid-al-adha",
      date: "Variable (Islamic calendar)",
      name: "Eid al-Adha",
      country: "All Central Asia",
      desc: "Festival of Sacrifice, commemorating Ibrahim's willingness to sacrifice his son.",
      longDesc: "Eid al-Adha is one of the most important Islamic holidays, celebrated with communal prayers, animal sacrifices, and sharing meat with family, friends, and the less fortunate. Traditional dishes include various meat preparations and special breads.",
      activities: ["Communal prayers", "Animal sacrifice", "Charity", "Family feasts", "Traditional cooking"],
      isActive: false
    },

    // Winter Celebrations
    {
      id: "kazakhstan-independence",
      date: "December 16",
      name: "Independence Day",
      country: "Kazakhstan",
      desc: "Celebration of Kazakhstan's independence with cultural performances and national pride.",
      longDesc: "Kazakhstan's Independence Day is celebrated with grand cultural performances, traditional music concerts, and exhibitions showcasing the country's rich cultural heritage and modern achievements.",
      activities: ["Cultural performances", "Traditional music", "National exhibitions", "Fireworks"],
      isActive: today.getMonth() === 11 && today.getDate() >= 14 && today.getDate() <= 18
    },
    {
      id: "kyrgyzstan-independence",
      date: "August 31",
      name: "Independence Day",
      country: "Kyrgyzstan",
      desc: "Celebration of Kyrgyzstan's independence with traditional nomadic culture and modern achievements.",
      longDesc: "Kyrgyzstan's Independence Day celebrates the country's sovereignty with traditional nomadic games, cultural performances, and exhibitions highlighting the unique heritage of the Kyrgyz people.",
      activities: ["Nomadic games", "Cultural performances", "Traditional music", "National celebrations"],
      isActive: today.getMonth() === 7 && today.getDate() >= 28 && today.getDate() <= 31
    },
    {
      id: "uzbekistan-independence",
      date: "September 1",
      name: "Independence Day",
      country: "Uzbekistan",
      desc: "Celebration of Uzbekistan's independence with Silk Road heritage and cultural diversity.",
      longDesc: "Uzbekistan's Independence Day showcases the country's rich Silk Road heritage with traditional crafts, cultural performances, and exhibitions celebrating the diverse cultural traditions of Uzbekistan.",
      activities: ["Silk Road exhibitions", "Traditional crafts", "Cultural performances", "National celebrations"],
      isActive: today.getMonth() === 8 && today.getDate() >= 30 && today.getDate() <= 31 || today.getMonth() === 8 && today.getDate() >= 1 && today.getDate() <= 3
    },
    {
      id: "tajikistan-independence",
      date: "September 9",
      name: "Independence Day",
      country: "Tajikistan",
      desc: "Celebration of Tajikistan's independence with Persian heritage and mountain culture.",
      longDesc: "Tajikistan's Independence Day celebrates the country's sovereignty with traditional Persian-influenced celebrations, mountain culture exhibitions, and cultural performances highlighting Tajik heritage.",
      activities: ["Persian celebrations", "Mountain culture", "Cultural performances", "National exhibitions"],
      isActive: today.getMonth() === 8 && today.getDate() >= 6 && today.getDate() <= 12
    },
    {
      id: "turkmenistan-independence",
      date: "October 27",
      name: "Independence Day",
      country: "Turkmenistan",
      desc: "Celebration of Turkmenistan's independence with traditional carpet culture and modern development.",
      longDesc: "Turkmenistan's Independence Day showcases the country's unique heritage with traditional carpet exhibitions, cultural performances, and celebrations highlighting Turkmen traditions and modern achievements.",
      activities: ["Carpet exhibitions", "Cultural performances", "Traditional crafts", "National celebrations"],
      isActive: today.getMonth() === 9 && today.getDate() >= 24 && today.getDate() <= 30
    },
    {
      id: "new-year",
      date: "December 31",
      name: "New Year",
      country: "All Central Asia",
      desc: "Modern New Year celebration with traditional elements and family gatherings.",
      longDesc: "New Year celebrations in Central Asia blend modern traditions with cultural elements. Families gather for festive meals, exchange gifts, and enjoy traditional music and dancing while welcoming the new year.",
      activities: ["Family gatherings", "Festive meals", "Gift exchange", "Traditional music", "Fireworks"],
      isActive: today.getMonth() === 11 && today.getDate() >= 28
    },

    // Cultural Heritage Celebrations
    {
      id: "qorqyt-day",
      date: "December",
      name: "Qorqyt Day",
      country: "Kazakhstan",
      desc: "Celebration of the legendary bard Qorqyt and traditional music heritage.",
      longDesc: "Qorqyt Day honors the legendary bard and musician who is considered the father of Kazakh traditional music. The celebration includes performances of traditional instruments like the dombra and kobyz, storytelling, and cultural exhibitions.",
      activities: ["Traditional music", "Dombra performances", "Storytelling", "Cultural exhibitions"],
      isActive: today.getMonth() === 11
    },

    {
      id: "silk-road-festival",
      date: "May",
      name: "Silk Road Festival",
      country: "Uzbekistan",
      desc: "Celebration of the historic Silk Road with traditional crafts and cultural exchange.",
      longDesc: "The Silk Road Festival celebrates the historic trade route that connected Central Asia with the world. The festival features traditional crafts, cultural performances, and exhibitions showcasing the region's rich trading heritage.",
      activities: ["Traditional crafts", "Cultural performances", "Trade exhibitions", "Historical reenactments"],
      isActive: today.getMonth() === 4
    },
    {
      id: "horse-festival",
      date: "July",
      name: "Horse Festival",
      country: "Kyrgyzstan",
      desc: "Celebration of the horse in Kyrgyz culture with traditional equestrian sports.",
      longDesc: "The Horse Festival celebrates the central role of horses in Kyrgyz nomadic culture. The festival includes traditional equestrian sports, horse racing, and cultural performances highlighting the deep connection between the Kyrgyz people and their horses.",
      activities: ["Horse racing", "Equestrian sports", "Cultural performances", "Traditional games"],
      isActive: today.getMonth() === 6
    },
    {
      id: "carpet-festival",
      date: "October",
      name: "Carpet Festival",
      country: "Turkmenistan",
      desc: "Celebration of traditional carpet weaving and Turkmen cultural heritage.",
      longDesc: "The Carpet Festival showcases Turkmenistan's world-famous carpet weaving traditions. The festival includes exhibitions of traditional carpets, weaving demonstrations, and cultural performances celebrating Turkmen heritage.",
      activities: ["Carpet exhibitions", "Weaving demonstrations", "Cultural performances", "Traditional crafts"],
      isActive: today.getMonth() === 9
    },
    {
      id: "music-festival",
      date: "August",
      name: "Traditional Music Festival",
      country: "All Central Asia",
      desc: "Celebration of traditional Central Asian music and instruments.",
      longDesc: "The Traditional Music Festival brings together musicians from across Central Asia to celebrate the region's rich musical heritage. The festival features performances of traditional instruments like the dombra, dutar, and rubab, along with folk songs and dances.",
      activities: ["Traditional music", "Instrument performances", "Folk songs", "Cultural dances"],
      isActive: today.getMonth() === 7
    }
  ];

  const getActiveTraditions = () => {
    return traditions.filter(tradition => tradition.isActive);
  };

  const getUpcomingTraditions = () => {
    const now = new Date();
    return traditions.filter(tradition => {
      const [month, day] = tradition.date.split(" ");
      const traditionMonth = getMonthNumber(month);
      const traditionDay = parseInt(day) || 1;
      
      const traditionDate = new Date(now.getFullYear(), traditionMonth, traditionDay);
      if (traditionDate < now) {
        traditionDate.setFullYear(now.getFullYear() + 1);
      }
      
      const diffTime = traditionDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      return diffDays <= 30 && diffDays >= 0;
    });
  };

  const getMonthNumber = (month: string) => {
    const months: { [key: string]: number } = {
      "January": 0, "February": 1, "March": 2, "April": 3, "May": 4, "June": 5,
      "July": 6, "August": 7, "September": 8, "October": 9, "November": 10, "December": 11
    };
    return months[month] || 0;
  };

  const activeTraditions = getActiveTraditions();
  const upcomingTraditions = getUpcomingTraditions();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 space-y-10">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold">Central Asian Traditions & Celebrations</h1>
        <p className="mt-3 text-muted-foreground max-w-prose">
          Explore the rich cultural heritage and traditional celebrations from across Central Asia, 
          from Kazakhstan to Turkmenistan, celebrating the diverse customs that unite our region.
        </p>
      </div>

      {/* Currently Active Traditions */}
      {activeTraditions.length > 0 && (
        <section className="rounded-2xl border p-6 bg-gradient-to-r from-orange-50 to-yellow-50">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-orange-600" />
            <h2 className="text-xl font-semibold text-orange-800">Currently Celebrating</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeTraditions.map((tradition) => (
              <div 
                key={tradition.id}
                className="rounded-xl border bg-white p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedTradition(selectedTradition === tradition.id ? null : tradition.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-orange-800">{tradition.name}</h3>
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">Active</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-3 w-3" />
                  <span>{tradition.date}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                  <MapPin className="h-3 w-3" />
                  <span>{tradition.country}</span>
                </div>
                <p className="text-sm">{tradition.desc}</p>
                
                {selectedTradition === tradition.id && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm mb-3">{tradition.longDesc}</p>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Activities:</h4>
                      <div className="flex flex-wrap gap-1">
                        {tradition.activities.map((activity, index) => (
                          <span key={index} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Traditions */}
      {upcomingTraditions.length > 0 && (
        <section className="rounded-2xl border p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Celebrations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingTraditions.map((tradition) => (
              <div 
                key={tradition.id}
                className="rounded-xl border p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedTradition(selectedTradition === tradition.id ? null : tradition.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold">{tradition.name}</h3>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Soon</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-3 w-3" />
                  <span>{tradition.date}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                  <MapPin className="h-3 w-3" />
                  <span>{tradition.country}</span>
                </div>
                <p className="text-sm">{tradition.desc}</p>
                
                {selectedTradition === tradition.id && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm mb-3">{tradition.longDesc}</p>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Activities:</h4>
                      <div className="flex flex-wrap gap-1">
                        {tradition.activities.map((activity, index) => (
                          <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* All Traditions Calendar */}
      <section className="rounded-2xl border p-6">
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Complete Traditions Calendar</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {traditions.map((tradition) => (
            <div 
              key={tradition.id}
              className="rounded-xl border p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedTradition(selectedTradition === tradition.id ? null : tradition.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold">{tradition.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  tradition.isActive 
                    ? "bg-orange-100 text-orange-700" 
                    : "bg-gray-100 text-gray-700"
                }`}>
                  {tradition.isActive ? "Active" : "Seasonal"}
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                <Calendar className="h-3 w-3" />
                <span>{tradition.date}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                <MapPin className="h-3 w-3" />
                <span>{tradition.country}</span>
              </div>
              <p className="text-sm">{tradition.desc}</p>
              
              {selectedTradition === tradition.id && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm mb-3">{tradition.longDesc}</p>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Activities:</h4>
                    <div className="flex flex-wrap gap-1">
                      {tradition.activities.map((activity, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Cultural Heritage Note */}
      <section className="rounded-2xl border p-6 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="flex items-center gap-2 mb-4">
          <Users className="h-5 w-5 text-green-600" />
          <h2 className="text-xl font-semibold text-green-800">Cultural Heritage</h2>
        </div>
        <p className="text-sm text-green-700">
          These celebrations represent the rich cultural tapestry of Central Asia, connecting ancient traditions 
          with modern communities. Each celebration offers a unique window into the customs, values, and 
          community spirit that define our region's cultural identity.
        </p>
      </section>
    </div>
  );
} 