class CommunityController < ApplicationController
    def index
        public_selections = Selection.are_public #.filter{ |i| !i.comments.empty? }

        options = {
            include: [:'kit.theme']
        }

        serialized_selections = []
        public_selections.each do |selection|
            unit = SelectionSerializer.new(selection, options)
            serialized_selections.push(unit)
        end
        
        comment_options = {
            include: [:user, :selection, :'selection.kit', :'selection.kit.theme']
        }
        
        serialized_comments = []
        public_comments = public_selections.each do |selection|
            selection.comments.each {|comment| serialized_comments.push(CommentSerializer.new(comment))}
        end


        serialized_package = { :selections => serialized_selections, :comments => serialized_comments }
        
        if serialized_package.empty?
            render json: {"message": "There are currently no publice selections in the System."}
        else
            render json: serialized_package
        end

    end

    private

    def community_params
         
    end
end
