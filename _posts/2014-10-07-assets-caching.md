---
layout: post
title: Caching assets with revisioning
categories: cache, assets
---
I was reading <a href="https://developers.google.com/speed/docs/insights/LeverageBrowserCaching">Leverage Browser Caching</a> and something stood out from the article:

<blockquote>If you need precise control over when resources are invalidated we recommend using a URL fingerprinting or versioning technique [...]</blockquote>

It made me wonder if there is something available for Grunt which I can use to achieve something similar so I could use longer caching times on my assets.

##Breaking down

<a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching#invalidating-and-updating-cached-responses">So, how do we get the best of both worlds: client-side caching and quick updates?</a>

There are basically two concerns:

* Creating a md5-hash based on the contents of the file, or filesize, or automatically updates the version number upon a save, etc.
* Figure out a way to update the source files with the updated version.

##The solution

There are two plugins for Grunt which are used by Yeoman which makes this process very easy.

There is <a href="https://github.com/yeoman/grunt-filerev">Filerev</a> for the creation and adding a hash to the file.

<blockquote>This task will revision your files based on its contents.</blockquote>

And <a href="https://github.com/yeoman/grunt-usemin">Usemin</a> to update the source with the new names of every changed file.

So, if I only want to update all my images with a revision, I can do this:

{% highlight javascript %}
filerev: {
	options: {
		algorithm: 'md5',
		length: 8
	},
	images: {
		src: '_site/**/*.{jpg,jpeg,gif,png}'
	}
},

usemin: {
	html: ['_site/*.html', '_site/blog/*.html'],
	options: {
	    assetsDirs: ['_site/']
	}
}
{% endhighlight %}

And in my Network tab of the browser I see my newly revisioned images:

<pre>
Date: Fri, 21 Nov 2014 19:41:45 GMT
Expires: Mon, 18 Nov 2024 19:39:58 GMT
Last-Modified: Tue, 07 Oct 2014 21:01:34 GMT
</pre>

The last thing that needs to be done is updating my <em>.htaccess</em> with some
<a href="http://www.stevesouders.com/blog/2008/08/23/revving-filenames-dont-use-querystring/">expire headers that are set in the future</a>:

{% highlight xml %}
<FilesMatch "\.(jpg|jpeg|png|gif)$">
ExpiresActive On
ExpiresDefault "access plus 10 years"
</FilesMatch>
{% endhighlight %}

##Wrapping up

I can use longer caching dates because I use revisioning on my images. When I edit an image, it will be updated with new hashes.

I could also do the same for my JavaScript files in the future.

__Note:__ the <a href="https://github.com/h5bp/html5-boilerplate/blob/master/dist/.htaccess">HTML5 Boilerplate</a> is also a well-documented source with best practices.
