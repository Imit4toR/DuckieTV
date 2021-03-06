DuckieTV.run(["TorrentSearchEngines", "SettingsService", "$q", "$http", "$injector",
    function(TorrentSearchEngines, SettingsService, $q, $http, $injector) {
        if (SettingsService.get('torrenting.enabled')) {

            TorrentSearchEngines.registerSearchEngine('Zooqle', new GenericTorrentSearchEngine({
                mirror: 'https://zooqle.com',
                mirrorResolver: null,
                includeBaseURL: true,
                endpoints: {
                    search: '/search?q=%s&s=%o&v=t&sd=d',
                    details: '%s'
                },
                selectors: {
                    resultContainer: 'tr ',
                    releasename: ['td:nth-child(2) > a', 'innerText'],
                    magnetUrl: ['a[title^="Magnet link"', 'href',
                        function(href) {
                            return href + '&tr=udp://tracker.coppersurfer.tk:6969/announce&tr=udp://9.rarbg.me:2780/announce&tr=udp://9.rarbg.to:2710/announce&tr=udp://9.rarbg.com:2740/announce&tr=udp://eddie4.nl:6969/announce&tr=udp://tracker.leechers-paradise.org:6969/announce&tr=udp://explodie.org:6969/announce&tr=udp://p4p.arenabg.ch:1337/announce';
                        }
                    ],
                    size: ['td:nth-child(4)', 'innerText',
                        function(text) {
                            return (text == '– N/A –') ? null : text;
                        }
                    ],
                    seeders: ['td:nth-child(6) div div:first-child', 'innerText',
                        function(text) {
                            return (text[text.length-1] == 'K') ? parseInt(text) * 1000 : text;
                        }
                    ],
                    leechers: ['td:nth-child(6) div div:last-child', 'innerText',
                        function(text) {
                            return (text[text.length-1] == 'K') ? parseInt(text) * 1000 : text;
                        }
                    ],
                    detailUrl: ['td:nth-child(2) > a', 'href']
                },
                detailsSelectors: {
                    detailsContainer: '#torrent',
                    magnetUrl: ['#dlPanel a:nth-of-type(1)', 'href']
                },
                orderby: {
                    age: 'dt',
                    seeders: 'ns', 
                    size: 'sz'
                }
            }, $q, $http, $injector));
        }
    }
]);