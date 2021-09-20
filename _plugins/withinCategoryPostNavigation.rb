module Jekyll
  class WithinCategoryPostNavigation < Generator
    # inspired by https://ajclarkson.co.uk/blog/jekyll-category-post-navigation/
    def generate(site)
      site.categories.each_pair do |category, posts|
        sorted_posts = posts.sort_by { |a| a.date }.reverse
        sorted_posts.each_with_index do |post,index|
          next_in_category = nil
          previous_in_category = nil

          if index < posts.length - 1
            previous_in_category = posts[index + 1]
          end
          if index > 0
            next_in_category = posts[index - 1]
          end

          post.data["next_in_category"] = next_in_category unless next_in_category.nil?
          post.data["previous_in_category"] = previous_in_category unless previous_in_category.nil?
        end
      end
    end
  end
end
