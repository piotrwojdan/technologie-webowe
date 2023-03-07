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
        'register_meta_box_cb' => 'add_expiry_date_metabox',
  
    );
      
    // Registering your Custom Post Type
    register_post_type( 'ads', $args );
  
}

add_action('init', 'create_posttype');

function insert_adv1($content){
    
    $args = array (
        'post_type' => 'ads',
        'post_status' => 'publish',
        'meta_query' => array(
            array(
                'key' => 'expiry_date',
                'value' => date('Y-m-d H:i:s'),
                'compare' => '>',
                'type' => 'DATETIME'
            )
        )
    );

    $adsQuery = get_posts($args);
    $ads = array();
    $j = 0;
    
    foreach ($adsQuery as $ad){
        if (!empty($ad->post_content)) {
            $ads[$j] = $ad;
            $j++;
        }
    }
//    $ads = $adsQuery;
    
    if (empty($ads)) {
        return $content;
    }

    if ( is_single() ) {
        
       if ( ! empty( $content ) ) {
            $ad = $ads[rand(0,count($ads)-1)];
            $content = "<div class='ramka'>".$ad ->post_content."</div>" .$content;
        } else {
            $content = "<div class='ramka'>".$ad ->post_content;
        }
        
    }
    return $content;

}

add_filter( 'the_content', 'insert_adv1' );

function ads_styles(){
    wp_register_style('styles', plugins_url('/css/style.css', __FILE__));
    wp_enqueue_style('styles');
}
add_action('init', 'ads_styles');

function add_expiry_date_metabox() {
    add_meta_box(
        'expiry_date_metabox',
        'Expiry Date',
        'render_expiry_date_metabox',
        'ads',
        'side',
        'default'
    );
}

function render_expiry_date_metabox($post) {
    // Retrieve the existing value of the expiry date field
    $expiry_date = get_post_meta($post->ID, 'expiry_date', true);
    ?>
    <p><label for="expiry_date_field">Expiry Date:</label></p>
    <p><input type="datetime-local" id="expiry_date_field" name="expiry_date_field" value="<?php echo esc_attr($expiry_date); ?>"></p>
    <?php
}

function save_expiry_date_metabox($post_id) {
    if (array_key_exists('expiry_date_field', $_POST)) {
        update_post_meta(
            $post_id,
            'expiry_date',
            sanitize_text_field($_POST['expiry_date_field'])
        );
    }
}
add_action('save_post_ads', 'save_expiry_date_metabox');



// function delete_expired(){
    
//     $args = array(
//         'post-type' => 'ads',
//         'meta_query' => array(
//             array(
//                 'key' => 'expiry_date',
//                 'value' => date('Y-m-d H:i:s'),
//                 'compare' => '<',
//                 'type' => 'DATETIME'
//             )
//         )
//     );

//     // $ads = new WP_Query($args);

//     // if($ads->have_posts()){
//     //     while($ads->have_posts()){
//     //         echo $ads->the_post();
//     //         wp_delete_post(get_the_ID(), true);
//     //     }
//     //     wp_reset_postdata();
//     // }

// }


// function schedule_expired_posts_deletion() {
//     if (!wp_next_scheduled('delete_expired_posts_event')) {
//         wp_schedule_single_event(time() ,"daily", 'delete_expired_posts_event');
//     }
// }
// add_action('delete_expired_posts_event', 'delete_expired');
// wp_schedule_event(time(), 'daily', 'delete_expired_posts_event');
// add_action('wp', 'schedule_expired_posts_deletion');

?>
