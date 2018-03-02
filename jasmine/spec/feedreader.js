/* feedreader.js
 *
 * 这是 Jasmine 会读取的spec文件，它包含所有的要在你应用上面运行的测试。
 */

$(function() {
    // 这个用例的测试都是关于 Rss 源的定义的，也就是应用中的 allFeeds 变量。
    describe('RSS Feeds', function() {
        // 测试 allFeeds 变量被定义了而且不是空的。
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // 测试遍历 allFeeds 对象里面的所有的源来保证有链接字段而且链接不是空的。
        it('have url', function() {
			allFeeds.forEach(function(feed){
			    expect(feed.url).toBeDefined();
			    expect(feed.url.length).not.toBe(0);
			});
        });

        // 测试遍历 allFeeds 对象里面的所有的源来保证有名字字段而且不是空的。
        it('have name', function() {
			allFeeds.forEach(function(feed){
			    expect(feed.name).toBeDefined();
			    expect(feed.name.length).not.toBe(0);
			});
        });		 
    });

    // 测试用例 The menu
    describe('The menu', function() {
        // 测试菜单元素默认是隐藏的。
        it('hides by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        // 测试当菜单图标被点击的时候菜单会切换可见状态。
        it('toggles by click icon', function() {
            var menuIcon = $('.menu-icon-link');
			menuIcon.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            menuIcon.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);	
        });
	});

    // 设置变量用于存储.feed 容器及不同feed下.entry的内容。
    var $feed, entry1, entry2;

    // 测试用例 Initial Entries
    describe('Initial Entries', function() {
        // 测试 loadFeed 函数被调用而且工作正常，即在 .feed 容器元素里面至少有一个 .entry 的元素。
        $feed = $('.feed');
        beforeEach(function(done) {
            loadFeed(0, function() {
                entry1 = $feed.find('.entry').first().text();
                done();
            });
        });

        it('load feed success', function(done) {
            expect($feed.find('.entry').length).not.toBe(0);
            done();
        });
    });

    // 测试用例 New Feed Selection
    describe('New Feed Selection', function() {
        // 测试当用 loadFeed 函数加载一个新源的时候内容会真的改变。
        $feed = $('.feed');
        beforeEach(function(done) {
            loadFeed(1, function() {
                entry2 = $feed.find('.entry').first().text();
                done();
            });
        }, 20000);  //网络慢！把超时时间调长！！

        it('change entities success', function(done) {
            expect(entry1).not.toBe(entry2);
            done();
        });
    });

}());
