<?php
/**
* Plugin Name: G2kCookiesEULaw
* Plugin URI:  http://example.com
* Description: A radical new plugin for WordPress!
* Version:     0.1.0
* Author:      g2k
* Author URI:  http://example.com
* Donate link: http://example.com
* License:     GPLv2
* Text Domain: G2kCookiesEULaw
 * Domain Path: /languages
 */

/**
 * Copyright (c) 2015 g2k (email : dev@graffiti.it)
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License, version 2 or, at
 * your discretion, any later version, as published by the Free
 * Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 */

/**
 * Built using generator-plugin-wp
 */


// User composer autoload.
require 'vendor/autoload_52.php';


/**
 * Main initiation class
 *
 * @since  0.1.0
 * @var  string $version  Plugin version
 * @var  string $basename Plugin basename
 * @var  string $url      Plugin URL
 * @var  string $path     Plugin Path
 */
class G2kCookiesEULaw {

	/**
	 * Current version
	 *
	 * @var  string
	 * @since  0.1.0
	 */
	const VERSION = '0.1.0';

	/**
	 * URL of plugin directory
	 *
	 * @var string
	 * @since  0.1.0
	 */
	protected $url      = '';

	/**
	 * Path of plugin directory
	 *
	 * @var string
	 * @since  0.1.0
	 */
	protected $path     = '';

	/**
	 * Plugin basename
	 *
	 * @var string
	 * @since  0.1.0
	 */
	protected $basename = '';

	/**
	 * Singleton instance of plugin
	 *
	 * @var G2kCookiesEULaw
	 * @since  0.1.0
	 */
	protected static $single_instance = null;

	/**
	 * Creates or returns an instance of this class.
	 *
	 * @since  0.1.0
	 * @return G2kCookiesEULaw A single instance of this class.
	 */
	public static function get_instance() {
		if ( null === self::$single_instance ) {
			self::$single_instance = new self();
		}

		return self::$single_instance;
	}

	/**
	 * Sets up our plugin
	 *
	 * @since  0.1.0
	 * @return  null
	 */
	protected function __construct() {
		$this->basename = plugin_basename( __FILE__ );
		$this->url      = plugin_dir_url( __FILE__ );
		$this->path     = plugin_dir_path( __FILE__ );

		$this->plugin_classes();
		$this->hooks();
	}

	/**
	 * Attach other plugin classes to the base plugin class.
	 *
	 * @since 0.1.0
	 * @return  null
	 */
	function plugin_classes() {
		// Attach other plugin classes to the base plugin class.
		// $this->admin = new G2---_Admin( $this );
	}

	/**
	 * Add hooks and filters
	 *
	 * @since 0.1.0
	 * @return null
	 */
	public function hooks()
	{
		register_activation_hook( __FILE__, array( $this, '_activate' ) );
		register_deactivation_hook( __FILE__, array( $this, '_deactivate' ) );

		add_action( 'init', array( $this, 'init' ) );

		add_filter( 'script_loader_tag', function ( $html, $handle )
		{
			echo $handle;
			$script_da_bloccare = array("Social_sharing_facebook_root", "mr_social_sharing", "Social_sharing_facebook_xfbml", "Social_sharing_twitter");

			if (in_array($handle, $script_da_bloccare))
			{
				preg_match("/https*:?\/\/.*.js(\?)*([a-zA-Z0-9]*=[a-zA-Z-0-9\.]*)*/", $html, $match );
				$src = $match[0];

				return " <script type='text/plain' class='cc-onconsent-social'>
					  var resource = document.createElement('script');
					  resource.src = '" . $src . "';
					  var script = document.getElementsByTagName('script')[0];
					  script.parentNode.insertBefore(resource, script);
				 </script> ";
			}
			else
			{
				return $html;
			}
		} , 12, 2);


		add_action( 'wp_enqueue_scripts', function()
		{
			wp_enqueue_style( 'cookieslaw', "/wp-content/plugins/g2k-cookies-eu-law/assets/bower/cookies-eu-law/cookieconsent.css");
			wp_enqueue_script( 'cookieslaw', "/wp-content/plugins/g2k-cookies-eu-law/assets/bower/cookies-eu-law/cookieconsent.js", 20, 1);
			wp_enqueue_script( 'cookieslaw-start',  "/wp-content/plugins/g2k-cookies-eu-law/assets/startconsent.js", 21, 1);
		});
	}



	/**
	 * Activate the plugin
	 *
	 * @since  0.1.0
	 * @return null
	 */
	function _activate() {
		// Make sure any rewrite functionality has been loaded
		flush_rewrite_rules();
	}

	/**
	 * Deactivate the plugin
	 * Uninstall routines should be in uninstall.php
	 *
	 * @since  0.1.0
	 * @return null
	 */
	function _deactivate() {}

	/**
	 * Init hooks
	 *
	 * @since  0.1.0
	 * @return null
	 */
	public function init() {
		if ( $this->check_requirements() ) {
			load_plugin_textdomain( 'G2kCookiesEULaw', false, dirname( $this->basename ) . '/languages/' );
		}
	}

	/**
	 * Check that all plugin requirements are met
	 *
	 * @since  0.1.0
	 * @return boolean
	 */
	public static function meets_requirements() {
		// Do checks for required classes / functions
		// function_exists('') & class_exists('')

		// We have met all requirements
		return true;
	}

	/**
	 * Check if the plugin meets requirements and
	 * disable it if they are not present.
	 *
	 * @since  0.1.0
	 * @return boolean result of meets_requirements
	 */
	public function check_requirements() {
		if ( ! $this->meets_requirements() ) {
			// Display our error
			echo '<div id="message" class="error">';
			echo '<p>' . sprintf( __( 'G2kCookiesEULaw is missing requirements and has been <a href="%s">deactivated</a>. Please make sure all requirements are available.', 'G2kCookiesEULaw' ), admin_url( 'plugins.php' ) ) . '</p>';
			echo '</div>';
			// Deactivate our plugin
			deactivate_plugins( $this->basename );

			return false;
		}

		return true;
	}

	/**
	 * Magic getter for our object.
	 *
	 * @since  0.1.0
	 * @param string $field
	 * @throws Exception Throws an exception if the field is invalid.
	 * @return mixed
	 */
	public function __get( $field ) {
		switch ( $field ) {
			case 'version':
				return self::VERSION;
			case 'basename':
			case 'url':
			case 'path':
				return $this->$field;
			default:
				throw new Exception( 'Invalid '. __CLASS__ .' property: ' . $field );
		}
	}
}

/**
 * Grab the G2kCookiesEULaw object and return it.
 * Wrapper for G2kCookiesEULaw::get_instance()
 *
 * @since  0.1.0
 * @return G2kCookiesEULaw  Singleton instance of plugin class.
 */
function g2k_cookies_eu_law() {
	return G2kCookiesEULaw::get_instance();
}

// Kick it off
g2k_cookies_eu_law();
