class CommentSerializer
  include FastJsonapi::ObjectSerializer
  attributes :comment, :id, :user, :selection

  belongs_to :user
  belongs_to :selection
end
