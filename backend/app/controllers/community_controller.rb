class CommunityController < ApplicationController
    def index
        public_selections = Selection.are_public #.filter{ |i| !i.comments.empty? }

        options = {
            include: [:user, :kit, :'kit.theme']
        }

        comment_options = {
            include: [:user, :selection, :'selection.kit', :'selection.kit.theme']
        }

        selection_payload = [[],nil]
        public_selections.each do |selection|
            unit = SelectionSerializer.new(selection, options)
           
            comment_package = []
            selection.comments.each do |comment|
                comment_unit = CommentSerializer.new(comment, comment_options)
                comment_package.push(comment_unit)
            end

            selection_payload[0].push({:selection => unit, :comments => comment_package})

        end
        selection_payload[1] = {:publicUsers => User.public_users}


        
        if selection_payload.empty?
            render json: {"message": "There are currently no publice selections in the System."}
        else
            render json: selection_payload
        end

    end

    private

    def community_params
         
    end
end
