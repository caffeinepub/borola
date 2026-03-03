import List "mo:core/List";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  include MixinStorage();

  var nextMlaId = 1;
  var nextCandidateId = 1;
  var nextSupporterId = 1;

  type MLA = {
    id : Nat;
    name : Text;
    constituency : Text;
    bio : Text;
    photo : Storage.ExternalBlob;
  };

  type Candidate = {
    id : Nat;
    name : Text;
    constituency : Text;
    bio : Text;
    photo : Storage.ExternalBlob;
  };

  type Supporter = {
    id : Nat;
    name : Text;
    phone : Text;
    address : Text;
    photo : Storage.ExternalBlob;
    joinedAt : Int;
  };

  let mlas = Map.empty<Nat, MLA>();
  let candidates = Map.empty<Nat, Candidate>();
  let supporters = Map.empty<Nat, Supporter>();

  // Admin authentication
  public query ({ caller }) func verifyAdmin(username : Text, password : Text) : async Bool {
    username == "BOROLA2026" and password == "BOROLA@2026"
  };

  // MLA functions
  public shared ({ caller }) func addMLA(name : Text, constituency : Text, bio : Text, photo : Storage.ExternalBlob) : async Nat {
    let id = nextMlaId;
    let mla : MLA = {
      id;
      name;
      constituency;
      bio;
      photo;
    };
    mlas.add(id, mla);
    nextMlaId += 1;
    id;
  };

  public shared ({ caller }) func updateMLA(id : Nat, name : Text, constituency : Text, bio : Text, photo : Storage.ExternalBlob) : async () {
    if (not mlas.containsKey(id)) {
      Runtime.trap("MLA does not exist");
    };
    let mla : MLA = {
      id;
      name;
      constituency;
      bio;
      photo;
    };
    mlas.add(id, mla);
  };

  public shared ({ caller }) func deleteMLA(id : Nat) : async () {
    if (not mlas.containsKey(id)) {
      Runtime.trap("MLA does not exist");
    };
    mlas.remove(id);
  };

  public query ({ caller }) func getMLA(id : Nat) : async MLA {
    switch (mlas.get(id)) {
      case (null) { Runtime.trap("MLA does not exist") };
      case (?mla) { mla };
    };
  };

  public query ({ caller }) func getAllMLAs() : async [MLA] {
    mlas.values().toArray();
  };

  // Candidate functions
  public shared ({ caller }) func addCandidate(name : Text, constituency : Text, bio : Text, photo : Storage.ExternalBlob) : async Nat {
    let id = nextCandidateId;
    let candidate : Candidate = {
      id;
      name;
      constituency;
      bio;
      photo;
    };
    candidates.add(id, candidate);
    nextCandidateId += 1;
    id;
  };

  public shared ({ caller }) func updateCandidate(id : Nat, name : Text, constituency : Text, bio : Text, photo : Storage.ExternalBlob) : async () {
    if (not candidates.containsKey(id)) {
      Runtime.trap("Candidate does not exist");
    };
    let candidate : Candidate = {
      id;
      name;
      constituency;
      bio;
      photo;
    };
    candidates.add(id, candidate);
  };

  public shared ({ caller }) func deleteCandidate(id : Nat) : async () {
    if (not candidates.containsKey(id)) {
      Runtime.trap("Candidate does not exist");
    };
    candidates.remove(id);
  };

  public query ({ caller }) func getCandidate(id : Nat) : async Candidate {
    switch (candidates.get(id)) {
      case (null) { Runtime.trap("Candidate does not exist") };
      case (?candidate) { candidate };
    };
  };

  public query ({ caller }) func getAllCandidates() : async [Candidate] {
    candidates.values().toArray();
  };

  // Supporter functions
  public shared ({ caller }) func addSupporter(name : Text, phone : Text, address : Text, photo : Storage.ExternalBlob, joinedAt : Int) : async Nat {
    let id = nextSupporterId;
    let supporter : Supporter = {
      id;
      name;
      phone;
      address;
      photo;
      joinedAt;
    };
    supporters.add(id, supporter);
    nextSupporterId += 1;
    id;
  };

  public shared ({ caller }) func deleteSupporter(id : Nat) : async () {
    if (not supporters.containsKey(id)) {
      Runtime.trap("Supporter does not exist");
    };
    supporters.remove(id);
  };

  public query ({ caller }) func getAllSupporters() : async [Supporter] {
    supporters.values().toArray();
  };

  public query ({ caller }) func getSupporter(id : Nat) : async Supporter {
    switch (supporters.get(id)) {
      case (null) { Runtime.trap("Supporter does not exist") };
      case (?supporter) { supporter };
    };
  };
};
