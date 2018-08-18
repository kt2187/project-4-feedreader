/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function() {
    
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    
    describe("RSS Feeds", function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        
        it("are defined", function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
//**************************************************************************************************************************************
        /* A test that loops through each feed
         * in the allFeeds object and ensure it has a URL defined
         * and that the URL is not empty.
         */
        it("urls are defined", function() {
            for(let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });
//**************************************************************************************************************************************
        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it("names are defined", function() {
            for(let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        })
    });
//**************************************************************************************************************************************
    /* A new test suite named "The menu" */

    describe("The menu", function() {

        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

       it("is hidden by default", function() {
            // Code before suggested change of using .hasClass()
            //const body = document.querySelector("body");
            //expect(body.classList.contains("menu-hidden")).toBe(true);

            // Code after suggested change of using .hasClass()
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
//**************************************************************************************************************************************
         
        /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

        it("toggles visibility on and off when clicked", function() {
            // Code before using hasClass
            //const body = document.querySelector("body");
            //const menu = document.querySelector(".menu-icon-link");

            $(".menu-icon-link").click();
            //visible
            expect($("body").hasClass("menu-hidden")).toBe(false);
            
            $(".menu-icon-link").click();
            //hidden
            expect($("body").hasClass("menu-hidden")).toBe(true);;
        });
    });
//**************************************************************************************************************************************
    /* A new test suite named "Initial Entries" */
    
        describe("Initial Entries", function() {

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function(done) {
            loadFeed(0, done); // Call the loadFeed function for the first index, having the id of 0.
        });

         it("Completes Work", function() {
            // Code before required change of using parent-child relationship to test if feed container has at least 1 child entry element inside it 
            //const feedEntries = document.querySelector(".feed");

            // after required change of using parent-child relationship to test if feed container has at least 1 child entry element inside it 
            expect($(".feed .entry").length).toBeGreaterThan(0);
        });
    });
//**************************************************************************************************************************************
        // Test suite for loading new content after initial load
        describe("New Feed Selection", function() {

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        // Sorting feed's content into a new empty array
        var prevFeed; // Variable to hold prevFeed
        var newFeed; // Variable to hold newFeed

        beforeEach(function(done) {
            loadFeed(0, function() {
                prevFeed = document.querySelector(".entry-link");
                // Feed 0 done loading
                loadFeed(1, function() {
                    newFeed = document.querySelector(".entry-link");
                    // feed 1 done loading
                    // Begin tests
                    done();
                });
            });
        });
        // Compare first feed against new feed content
        it("content actually changes", function() {
            // Test if content has changed
            expect(prevFeed === newFeed).toBe(false);
        });
    });
}());
