<?php
/**
 * Plugin Name: Advertisement Plugin
 * Plugin URI: https://database/plugins/Newly Added Post Highliter/
 * Description: Highlight newly posts with tags.
 * Version: 1.0
 * Requires at least: 5.0
 * Requires PHP: 7.2
 * Author: Magdalena Sołtysiak i Piotr Wojdan
 */

 function naph_admin_actions_register_menu(){
    add_options_page("Advertisement Plugin", "Advertisement Management", 'manage_options', "naph", "naph_admin_page");
}
   
add_action('admin_menu', 'naph_admin_actions_register_menu'); 

function naph_admin_page(){
    global $_POST;

 // process changes from form
    if(isset($_POST['naph_do_change'])){
        if($_POST['naph_do_change'] == 'Y'){
        $opDays = $_POST['naph_days'];
        echo '<div class="notice notice-success isdismissible"><p>Settings saved.</p></div>';
        update_option('naph_days', $opDays);
        }
    } 


    $opDays = get_option('naph_days');
?>

<div class="wrap">
    <h1>Add New Advertisement</h1>
        <form name="naph_form" method="post">
            <input type="hidden" name="naph_do_change" value="Y">
            <p>
            <input type="text" name="naph_days"  value="<?php echo $opDays ?>">  </p>
            <p class="submit"><input type="submit" value="Add advertisement"></p>
        </form>
</div>

<?php
}

function create_posttype(){
    $labels = array(
        'name'                => _x( 'Ads', 'Post Type General Name'),
        'singular_name'       => _x( 'Ads', 'Post Type Singular Name',),
        'menu_name'           => __( 'Ads'),
        'parent_item_colon'   => __( 'Parent Ad'),
        'all_items'           => __( 'All Ads' ),
        'view_item'           => __( 'View Ad'),
        'add_new_item'        => __( 'Add New Ad' ),
        'add_new'             => __( 'Add New' ),
        'edit_item'           => __( 'Edit Ad' ),
        'update_item'         => __( 'Update Ad' ),
        'search_items'        => __( 'Search Ad' ),
        'not_found'           => __( 'Not Found' ),
        'not_found_in_trash'  => __( 'Not found in Trash' ),
    );
      
      
    $args = array(
        'label'               => __( 'Ads' ),
        'description'         => __( 'Ads' ),
        'labels'              => $labels,
        'supports'            => array( 'title','editor' ),
        'taxonomies'          => array( ),
        'hierarchical'        => false,
        'public'              => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_nav_menus'   => true,
        'show_in_admin_bar'   => true,
        'menu_position'       => 5,
        'can_export'          => true,
        'has_archive'         => true,
        'exclude_from_search' => false,
        'publicly_queryable'  => true,
        'capability_type'     => 'post',
        'show_in_rest' => true,
  
    );
      
    // Registering your Custom Post Type
    register_post_type( 'ads', $args );
  
}

add_action('init', 'create_posttype');

function insert_adv1($content){
    
    $args = array (
        'post_type' => 'ads',
        'post_status' => 'publish'
    );

    $adsQuery = get_posts($args);

    if ( is_single() ) {
        
       if ( ! empty( $content ) ) {
            $ad = $adsQuery[rand(0,count($adsQuery)-1)];
            $content = $ad ->post_content .$content;
        }
        
    }
    return $content;

}

add_filter( 'the_content', 'insert_adv1' );
