mzTools
===========================================
This plugin is designed for the Anax-MVC framework

Installation
===========================================

Download Zip, or clone.

Copy/Move the jquery.mzTools.js to your js directory ex: Anax/webroot/js
And Copy/Move the mzTools.less/mzTools.css to your css directory.

If you want to use the modal without the ajax part it needs some configuration

    $('yourLink').mzModal({
            title: "Test Title",
            content: "Some kind of description... Or content/HTML",
            ajax: true // Change this to false if you don't need Ajax
    });
   
Full set of settings

    $('yourLink').mzModal({
            width : "50%",
            title: "Test Title",
            content: "Some kind of description...",
            top: "15%",
            left: "25%",
            ajax: true,         // Change this to false if you don't need Ajax
            url: "",            // URL to JSON page
            data: 'data',       // Send your data here
            ignoreLink: true,   // Ignores href (using href as fallback)
            bind: true,         // Bind to 'this'
            error: function(){
                // Error callback stuff
            }
    });

JSON Installation for Anax-MVC and Usage
===========================================

Download Zip, or clone.

Copy the JSON Directory inside AnaxModule/ to the app/src in your Anax-MVC Project

Add this to your config.
    
    //Your Anax Config
    $di = new \Anax\DI\CDIFactoryDefault();
    $di->setShared('json', function() {
        $json = new nuvalis\JSON\JSON();
        return $json;
    });
    $app = new \Anax\Kernel\CAnax($di);

Use it like this in your Anax Controller.

    //Your Controller
    public function getFormDataFromIdAction($id, $json = null) {
        // put your $id model or CForm calls here
        if ($json){
            // If JSON start rendering
            $this->json->render(['title' => 'Your Title for the Modal', 'content' => 'Your HTML Data']);
        } else {
            // Your normal views
            $this->theme->setTitle("Test");
            $this->views->add('test/test', [
                'form'  => $form
            ]);
        }
    }

To use this Action just use it like this.
    
    http://localhost/Anax/webroot/controller/get-form-data-from-id/1/json

It should now print your array data as JSON! Now you can pass this URL to your mzModal script like this example.

    // Anax index.tpl.php
    <script type="text/javascript">
        window.base_url = "<?php echo $this->url->create(''); ?>";
    </script>
    
    // Script File
    
    $('.login-modal').mzModal({
        url: window.base_url + '/users/login/json',
        complete: function () {
            // When complete change the url to non json for proper redirect.
            $('.mzmodal-inner > form').attr('action', window.base_url + '/users/login');
    
            //Adding extra links in the modal
            $('.mzmodal-inner').append('<p class="center"><a href="'+window.base_url+'/users/register">Register new account</a></p>');
        }
    });
    
    /*  The href will be overriden, 
    *   to disable this, change ignoreLink: to false 
    */
    <a class="login login-modal" href="http://localhost/anax/webroot/users/login/json">Login</a>


License
==========
The MIT License (MIT)

Copyright (c) 2014 Emil Nordqvist

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.