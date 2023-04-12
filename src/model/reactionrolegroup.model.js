class ReactionRoleGroupModel {
  constructor(name, message, members, inline) {
    this.name = name;
    this.message = message;
    this.members = members;
    this.inline = inline;
  }
}

module.exports = ReactionRoleGroupModel;