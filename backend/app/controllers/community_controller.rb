class CommunityController < ApplicationController
    def index
        public_selections = Selection.are_public
        
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
    

    def update

        public_selections = Selection.are_public
        public_comments = []
        public_selections.each {|selection| selection.comments.each {|comment| public_comments.push(comment)}}

        updated_comments = public_comments.reject {|num| update_params.detect{|i| i == num.id}}

        serialized_comments = []
        
        options = {
            include: [:user, :selection, :'selection.kit', :'selection.kit.theme']
        }
        updated_comments.each {|comment|serialized_comments.push(CommentSerializer.new(comment, options))}
        
        render json: serialized_comments   
    end

    
    private
    
    def update_params
        params.require(:community).require(:currentSet)
         
    end
end
