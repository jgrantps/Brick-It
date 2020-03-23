class CommentsController < ApplicationController
    def create
        
        comment = Comment.new(:user_id => current_user.id, :selection_id => commentParams[:selection_id], :comment => commentParams[:comment])
        if comment.save
            options = {
                include: [:user, :selection, :'selection.kit', :'selection.kit.theme']
            }

            render json: CommentSerializer.new(comment)
        else
            render json: {main: comment.errors.as_json(full_messages: true), reason: "error!"}
        end

    end

    def index
        comments = current_user.comments
        options = {
            include: [:user, :selection, :'selection.kit', :'selection.kit.theme']
        }

        serialized_package = []
        comments.each do |comment|
            unit = CommentSerializer.new(comment, options)
            serialized_package.push(unit)
        end

        if serialized_package.empty?
            render json: {"message": "You currently have no comments"}
        else
            render json: serialized_package
        end
    end

    def update
    end

    def destroy
        comment = Comment.find(delete_params[:id])
        if comment.user == current_user
            comment.destroy 
            render json:{"message": "Deleted", "deleted_id": comment.id}
        else
            render json: {"message": "Only a comment's author is allowed to delete a comment."}
        end
    end

    private

    def commentParams
        params.require(:selection_comment).permit(:selection_id, :comment) 
    end

    def delete_params
        params.permit(:id)
    end
    
end
