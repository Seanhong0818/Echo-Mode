# echo_verify_origin.py

def verify_origin(signature: str) -> bool:
    """
    Optional tone origin verification for Echo Open SDK.
    Compares input signature to known Meta Origin hash prefix.
    """
    META_ORIGIN_HASH_PREFIX = "c28d74c2"  # SHA-256 prefix from Meta Origin
    return signature.startswith(META_ORIGIN_HASH_PREFIX)

# Example usage (optional, not enforced in open version):
# if verify_origin(user_signature):
#     print("✅ Verified tone origin")
# else:
#     print("⚠️ Unverified origin – limited Insight support")
