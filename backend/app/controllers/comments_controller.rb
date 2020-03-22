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

    def update
    end

    def destroy
    end

    private

    def commentParams
        params.require(:selection_comment).permit(:selection_id, :comment) 
    end
    
end
