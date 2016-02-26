/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

/*
 Modified by: Kranthi Kiran
 Date: 26-Feb-2016
 Changes: Added all test cases as per Udacity feeder testing project
*/
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Iterate through each feed of allFeeds to check if the URL was provided and not empty
        it('Has non empty valid URLs', function(){
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                //expect URL not to be null or empty
                expect(feed.url.length).not.toBe(0);
            });
        });

        // Iterate through each feed of allFeeds to check if the name was provided and not empty
        it('Has non empty names', function(){
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                //expect URL not to be null or empty
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* Test suite to includes test cases for menu control*/
    describe('The Menu', function() {

        var body, menuElm;//to store body and menu objects

        // created before each to store common objects used by multile test cases
        beforeEach(function() {
            body = $('body');
            menuElm = $('.menu-icon-link');
        });

        // tests if menu was hidden by default
        it('was hidden by default', function(){
            expect(body.is('.menu-hidden')).toBe(true);
        });

        // tests if menu displays when clicked
        it('displays when clicked', function(){
            //get the menu element object and click on it
            menuElm.click();//show menu
            expect(body.is('.menu-hidden')).toBe(false);
            console.log('Menu clicked to display');
        });

        // tests if menu hides when clicked after it was open
        it('hides when clicked if it was open', function(){
            if(body.is('.menu-hidden'))//click only if it is hiden
                menuElm.click();
            menuElm.click(); //hide when clicked again
            expect(body.is('.menu-hidden')).toBe(true);
            console.log('Menu clicked to hide');
        });

    });

    /* Test suite to includes test cases for menu Initial Feed data*/
    describe('Initial Entries', function() {

        // before each function to call loadFeed ajax function
        beforeEach(function(done) {
            loadFeed(0, function(){
                done();
            });
        });

        // tests to check if at least some feed data has been retrieved
        it('has loaded at least single feed information', function(done){
            expect($('div.feed').children().length).toBeGreaterThan(0);
            done();
        });
    });

    /* Test suite for new feed selections */
    describe('New Feed Selection', function() {

        var divBefore, divAfter;

        // before each function to call loadFeed for 0 index and save before text in a global variable
        beforeEach(function(done){
            loadFeed(0, function(){
                divBefore = $('div.feed a:first').text();
                done();
            });
        });

        // test case to check if feed data has been changed with new data feed
        it('has changed', function(done){
            loadFeed(2, function(){
                divAfter = $('div.feed a:first').first().text();
                expect(divAfter).not.toEqual(divBefore);
                done();
            });
        });

        // after each function to revert back to earlier state of index feed 0.
        afterEach(function(done){
            loadFeed(0, function(){
                done();
            });
        });
    });
}());


